import { useNavigate, useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowLeftIcon, PencilSquareIcon, TrashIcon,
  PrinterIcon, CalendarDaysIcon, TagIcon,
  DocumentTextIcon, UserCircleIcon, ClockIcon,
} from '@heroicons/react/24/outline'
import { getTransaction, deleteTransaction } from '../../services/transaction.service'
import { CATEGORY_MAP } from '../../constants'
import { formatRupiah, formatDate, formatDateTime } from '../../utils/format'
import toast from 'react-hot-toast'

const InfoRow = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
      <p className={`text-sm font-medium mt-0.5 ${highlight ? 'text-primary-600 dark:text-primary-400 text-base font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
        {value || '-'}
      </p>
    </div>
  </div>
)

export default function TransactionDetailPage() {
  const { id }  = useParams()
  const navigate = useNavigate()
  const qc      = useQueryClient()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: t, isLoading } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransaction(id),
    select: r => r.data,
  })

  const deleteMut = useMutation({
    mutationFn: () => deleteTransaction(id),
    onSuccess: () => {
      toast.success('Transaksi berhasil dihapus')
      qc.invalidateQueries({ queryKey: ['transactions'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      navigate('/transaksi')
    },
    onError: e => toast.error(e.message),
  })

  const cat = CATEGORY_MAP[t?.kategori]

  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      <div className="skeleton h-8 w-40" />
      <div className="card space-y-3">
        {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-12 w-full" />)}
      </div>
    </div>
  )

  if (!t) return (
    <div className="text-center py-20">
      <p className="text-slate-500 mb-4">Transaksi tidak ditemukan</p>
      <Link to="/transaksi" className="btn-primary text-sm px-4 py-2">Kembali</Link>
    </div>
  )

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-icon">
            <ArrowLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="page-title !mb-0">Detail Transaksi</h1>
        </div>
        <button onClick={() => window.print()} id="btn-print"
          className="btn-icon">
          <PrinterIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Total highlight card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${cat?.color || '#16a34a'}, ${cat?.color || '#15803d'}cc)` }}>
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute -right-2 -bottom-6 w-28 h-28 bg-white/5 rounded-full" />
        <span className="inline-block text-xs font-medium px-3 py-1 bg-white/20 rounded-full mb-2">
          {cat?.label || t.kategori}
        </span>
        <p className="text-lg font-bold leading-tight">{t.uraian}</p>
        <p className="text-3xl font-extrabold mt-2">{formatRupiah(t.jumlah)}</p>
        <p className="text-sm opacity-70 mt-1">{t.volume} {t.satuan} × {formatRupiah(t.harga)}</p>
      </motion.div>

      {/* Detail info */}
      <div className="card">
        <InfoRow icon={CalendarDaysIcon} label="Tanggal"       value={formatDate(t.tanggal)} />
        <InfoRow icon={TagIcon}          label="Nomor Nota"    value={t.nomorNota || 'Tidak ada nomor nota'} />
        <InfoRow icon={DocumentTextIcon} label="Catatan"       value={t.catatan || 'Tidak ada catatan'} />
        <InfoRow icon={UserCircleIcon}   label="Dibuat Oleh"   value={t.dibuatOleh} />
        <InfoRow icon={ClockIcon}        label="Waktu Dibuat"  value={formatDateTime(t.dibuatPada)} />
      </div>

      {/* Rincian biaya */}
      <div className="card">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Rincian Biaya</h2>
        <div className="space-y-2">
          {[
            ['Volume', `${t.volume} ${t.satuan}`],
            ['Harga Satuan', formatRupiah(t.harga)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">{k}</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{v}</span>
            </div>
          ))}
          <div className="divider my-2" />
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Total</span>
            <span className="font-bold text-primary-600 text-base">{formatRupiah(t.jumlah)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link to={`/transaksi/${id}/edit`} id="detail-btn-edit"
          className="btn-secondary flex-1 text-sm">
          <PencilSquareIcon className="w-4 h-4" /> Edit
        </Link>
        <button onClick={() => setShowDeleteDialog(true)} id="detail-btn-hapus"
          className="btn-danger flex-1 text-sm">
          <TrashIcon className="w-4 h-4" /> Hapus
        </button>
      </div>

      {/* Delete dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Hapus Transaksi?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteDialog(false)} className="btn-secondary flex-1">Batal</button>
                <button onClick={() => deleteMut.mutate()} id="confirm-delete"
                  className="btn-danger flex-1" disabled={deleteMut.isPending}>
                  {deleteMut.isPending ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
