/**
 * SIMKEU MIQ — Google Apps Script Backend
 * =========================================
 * Deploy sebagai Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * CARA SETUP:
 * 1. Buka script.google.com → New Project
 * 2. Salin semua kode ini
 * 3. Hubungkan ke Google Spreadsheet (lihat SPREADSHEET_ID di bawah)
 * 4. Deploy → New Deployment → Web App
 * 5. Salin URL dan masukkan ke VITE_GAS_URL di .env
 */

// ===== KONFIGURASI =====
const SPREADSHEET_ID = 'GANTI_DENGAN_SPREADSHEET_ID_ANDA'
const SESSION_EXPIRY_HOURS = 24

// ===== NAMA SHEET =====
const SHEETS = {
  USER:              'USER',
  KESEKRETARIATAN:   'KESEKRETARIATAN',
  KONSUMSI:          'KONSUMSI',
  HONORARIUM:        'HONORARIUM',
  PERLENGKAPAN:      'PERLENGKAPAN',
  PUBLIKASI:         'PUBLIKASI',
  LAINLAIN:          'LAIN-LAIN',
  REKAP:             'REKAP',
  LOG:               'LOG',
  SETTING:           'SETTING',
}

// Mapping kategori ID ke nama sheet
const CATEGORY_SHEET = {
  kesekretariatan: SHEETS.KESEKRETARIATAN,
  konsumsi:        SHEETS.KONSUMSI,
  honorarium:      SHEETS.HONORARIUM,
  perlengkapan:    SHEETS.PERLENGKAPAN,
  publikasi:       SHEETS.PUBLIKASI,
  lainlain:        SHEETS.LAINLAIN,
}

// ===== HELPER =====
let _ssCache = null;
function getSS() {
  if (!_ssCache) _ssCache = SpreadsheetApp.openById(SPREADSHEET_ID);
  return _ssCache;
}
const sh  = (name) => getSS().getSheetByName(name)
const ok  = (data, msg = 'Success')  => ContentService.createTextOutput(JSON.stringify({ success: true,  message: msg, data })).setMimeType(ContentService.MimeType.JSON)
const err = (msg = 'Error')          => ContentService.createTextOutput(JSON.stringify({ success: false, message: msg })).setMimeType(ContentService.MimeType.JSON)

const generateId = () => Utilities.getUuid().replace(/-/g, '').substring(0, 16)
const now        = () => new Date().toISOString()
const escape     = (v) => String(v || '').replace(/[=+\-@]/g, "'$&") // prevent formula injection

// ===== ROUTER =====
function doGet(e)  { return route(e, 'GET')  }
function doPost(e) { return route(e, 'POST') }

function route(e, method) {
  try {
    const action = e.parameter?.action || ''
    const token  = e.parameter?.token  || ''

    // Public endpoints
    if (action === 'login') return handleLogin(JSON.parse(e.postData?.contents || '{}'))

    // Validate session for all other endpoints
    const user = validateSession(token)
    if (!user) return err('Session tidak valid. Silakan login kembali.')

    switch (action) {
      // Dashboard
      case 'dashboard':     return ok(getDashboard())

      // Transactions
      case 'transactions':  return ok(getTransactions(e.parameter))
      case 'transaction':   return ok(getTransaction(e.parameter.id))
      case 'addTransaction':return handleAddTransaction(JSON.parse(e.postData?.contents || '{}'), user)
      case 'updateTransaction': return handleUpdateTransaction(e.parameter.id, JSON.parse(e.postData?.contents || '{}'), user)
      case 'deleteTransaction': return handleDeleteTransaction(e.parameter.id, user)

      // Rekap
      case 'rekap':         return ok(getRekap())

      // Logs
      case 'logs':          return ok(getLogs(e.parameter))

      // Users
      case 'users':         return ok(getUsers())

      default: return err('Endpoint tidak ditemukan: ' + action)
    }
  } catch (error) {
    console.error(error)
    return err('Terjadi kesalahan server: ' + error.message)
  }
}

// ===== AUTH =====
function handleLogin(body) {
  const { username, password } = body
  if (!username || !password) return err('Username dan password wajib diisi')

  const sheet = sh(SHEETS.USER)
  const rows  = sheet.getDataRange().getValues()

  for (let i = 1; i < rows.length; i++) {
    const [id, uname, pass, nama, jabatan, status] = rows[i]
    if (uname === username && pass === password && status === 'Aktif') {
      const token = generateId() + generateId()
      const expiry = new Date(Date.now() + SESSION_EXPIRY_HOURS * 3600 * 1000).toISOString()

      // Save session to SETTING sheet
      saveSession(token, username, expiry)
      writeLog(username, 'Login', '-', null, null)

      return ok({ token, user: { nama, jabatan, username } }, 'Login berhasil')
    }
  }
  return err('Username atau Password salah')
}

function saveSession(token, username, expiry) {
  const sheet = sh(SHEETS.SETTING)
  const rows  = sheet.getDataRange().getValues()

  // Try to find existing session row to update
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === 'session_' + username) {
      sheet.getRange(i + 1, 2).setValue(token)
      sheet.getRange(i + 1, 3).setValue(expiry)
      return
    }
  }
  // Append new session
  sheet.appendRow(['session_' + username, token, expiry])
}

function validateSession(token) {
  if (!token) return null
  const sheet = sh(SHEETS.SETTING)
  const rows  = sheet.getDataRange().getValues()
  for (let i = 1; i < rows.length; i++) {
    const [key, savedToken, expiry, username] = rows[i]
    if (key.startsWith('session_') && savedToken === token) {
      if (new Date(expiry) > new Date()) {
        return key.replace('session_', '')
      }
    }
  }
  return null
}

// ===== TRANSACTIONS =====
function getTransactions(params = {}) {
  const { search = '', kategori = '', page = 1, limit = 20 } = params
  const lim = Number(limit)
  const pg  = Number(page)

  let allRows = []

  const sheetsToRead = kategori && CATEGORY_SHEET[kategori]
    ? [CATEGORY_SHEET[kategori]]
    : Object.values(CATEGORY_SHEET)

  sheetsToRead.forEach(sheetName => {
    const sheet = sh(sheetName)
    if (!sheet) return
    const rows = sheet.getDataRange().getValues()
    const catId = Object.keys(CATEGORY_SHEET).find(k => CATEGORY_SHEET[k] === sheetName)
    rows.slice(1).forEach(r => {
      if (!r[0]) return
      const t = rowToTransaction(r, catId)
      if (search && !t.uraian?.toLowerCase().includes(search.toLowerCase()) && !t.nomorNota?.includes(search)) return
      allRows.push(t)
    })
  })

  allRows.sort((a, b) => new Date(b.dibuatPada) - new Date(a.dibuatPada))
  const total = allRows.length
  const data  = allRows.slice((pg - 1) * lim, pg * lim)
  return { data, total, page: pg, limit: lim }
}

function getTransaction(id) {
  for (const [catId, sheetName] of Object.entries(CATEGORY_SHEET)) {
    const sheet = sh(sheetName)
    if (!sheet) continue
    const rows = sheet.getDataRange().getValues()
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) return rowToTransaction(rows[i], catId)
    }
  }
  throw new Error('Transaksi tidak ditemukan')
}

function handleAddTransaction(body, username) {
  const { tanggal, kategori, uraian, volume, satuan, harga, nomorNota, catatan } = body
  if (!tanggal || !kategori || !uraian || !volume || !harga) return err('Field wajib belum lengkap')
  if (Number(volume) <= 0) return err('Volume harus lebih dari 0')
  if (Number(harga)  <= 0) return err('Harga harus lebih dari 0')
  if (!CATEGORY_SHEET[kategori]) return err('Kategori tidak valid')

  const sheet  = sh(CATEGORY_SHEET[kategori])
  const id     = generateId()
  const jumlah = Number(volume) * Number(harga)
  const row    = [id, tanggal, escape(uraian), Number(volume), escape(satuan), Number(harga), jumlah, escape(nomorNota || ''), escape(catatan || ''), '', username, now()]

  sheet.appendRow(row)
  writeLog(username, 'Tambah', CATEGORY_SHEET[kategori], null, { id, uraian, jumlah })
  return ok({ id }, 'Data berhasil disimpan')
}

function handleUpdateTransaction(id, body, username) {
  for (const [catId, sheetName] of Object.entries(CATEGORY_SHEET)) {
    const sheet = sh(sheetName)
    if (!sheet) continue
    const range = sheet.getDataRange()
    const rows  = range.getValues()
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) {
        const oldData = rowToTransaction(rows[i], catId)
        const { tanggal, kategori, uraian, volume, satuan, harga, nomorNota, catatan } = body
        const jumlah = Number(volume) * Number(harga)
        const updated = [id, tanggal, escape(uraian), Number(volume), escape(satuan), Number(harga), jumlah, escape(nomorNota || ''), escape(catatan || ''), rows[i][9] || '', username, now()]
        sheet.getRange(i + 1, 1, 1, updated.length).setValues([updated])
        writeLog(username, 'Edit', sheetName, oldData, { id, uraian, jumlah })
        return ok(null, 'Data berhasil diperbarui')
      }
    }
  }
  return err('Transaksi tidak ditemukan')
}

function handleDeleteTransaction(id, username) {
  for (const [catId, sheetName] of Object.entries(CATEGORY_SHEET)) {
    const sheet = sh(sheetName)
    if (!sheet) continue
    const rows = sheet.getDataRange().getValues()
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) {
        const oldData = rowToTransaction(rows[i], catId)
        sheet.deleteRow(i + 1)
        writeLog(username, 'Hapus', sheetName, oldData, null)
        return ok(null, 'Data berhasil dihapus')
      }
    }
  }
  return err('Transaksi tidak ditemukan')
}

// ===== REKAP =====
function getRekap() {
  const rekap = {}
  Object.entries(CATEGORY_SHEET).forEach(([catId, sheetName]) => {
    const sheet = sh(sheetName)
    if (!sheet) { rekap[catId] = 0; return }
    const rows = sheet.getDataRange().getValues()
    rekap[catId] = rows.slice(1).reduce((sum, r) => sum + (Number(r[6]) || 0), 0)
  })
  rekap.grandTotal = Object.values(rekap).reduce((a, b) => a + b, 0)
  return rekap
}

// ===== DASHBOARD =====
function getDashboard() {
  const allTx  = []
  Object.entries(CATEGORY_SHEET).forEach(([catId, sheetName]) => {
    const sheet = sh(sheetName)
    if (!sheet) return
    const rows = sheet.getDataRange().getValues()
    rows.slice(1).forEach(r => { if (r[0]) allTx.push(rowToTransaction(r, catId)) })
  })

  const rekap = {}
  Object.keys(CATEGORY_SHEET).forEach(catId => {
    rekap[catId] = allTx.filter(t => t.kategori === catId).reduce((s, t) => s + (t.jumlah || 0), 0)
  })
  const grandTotal = Object.values(rekap).reduce((a, b) => a + b, 0)
  const topCat = Object.entries(rekap).sort((a, b) => b[1] - a[1])[0]

  allTx.sort((a, b) => new Date(b.dibuatPada) - new Date(a.dibuatPada))

  return {
    totalPengeluaran: grandTotal,
    jumlahTransaksi:  allTx.length,
    jumlahNota:       allTx.filter(t => t.nomorNota).length,
    kategoriTerbesar: topCat?.[0] || '-',
    rekap,
    transaksiTerbaru: allTx.slice(0, 10),
  }
}

// ===== USERS =====
function getUsers() {
  const rows = sh(SHEETS.USER).getDataRange().getValues()
  return rows.slice(1).map(r => ({
    id: r[0], username: r[1], nama: r[3], jabatan: r[4], status: r[5]
  }))
}

// ===== LOG =====
function writeLog(user, aksi, sheetName, dataLama, dataBaru) {
  try {
    sh(SHEETS.LOG).appendRow([
      now(), user, aksi, sheetName,
      dataLama ? JSON.stringify(dataLama) : '',
      dataBaru ? JSON.stringify(dataBaru) : '',
    ])
  } catch (e) {
    console.error('Log error:', e)
  }
}

function getLogs(params = {}) {
  const sheet = sh(SHEETS.LOG)
  const rows  = sheet.getDataRange().getValues()
  const pg    = Number(params.page  || 1)
  const lim   = Number(params.limit || 20)

  const logs = rows.slice(1).reverse().map(r => ({
    waktu: r[0], user: r[1], aksi: r[2], kategori: r[3],
    dataLama: r[4], dataBaru: r[5],
  }))

  return { data: logs.slice((pg - 1) * lim, pg * lim), total: logs.length }
}

// ===== HELPER =====
function rowToTransaction(r, catId) {
  return {
    id:          r[0],
    tanggal:     r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Jakarta', 'yyyy-MM-dd') : r[1],
    uraian:      r[2],
    volume:      r[3],
    satuan:      r[4],
    harga:       r[5],
    jumlah:      r[6],
    nomorNota:   r[7],
    catatan:     r[8],
    foto:        r[9],
    dibuatOleh:  r[10],
    dibuatPada:  r[11],
    kategori:    catId,
  }
}
