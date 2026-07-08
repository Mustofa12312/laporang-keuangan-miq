import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, CalculatorIcon } from '@heroicons/react/24/outline'
import { addTransaction, updateTransaction, getTransaction } from '../../services/transaction.service'
import { CATEGORIES, UNITS } from '../../constants'
import { formatDateInput, formatRupiah } from '../../utils/format'
import toast from 'react-hot-toast'

const schema = z.object({
  tanggal:    z.string().min(1, 'Tanggal wajib diisi'),
  kategori:   z.string().min(1, 'Kategori wajib dipilih'),
  uraian:     z.string().min(2, 'Uraian minimal 2 karakter').max(200),
  volume:     z.coerce.number({ invalid_type_error: 'Masukkan angka' }).positive('Volume harus > 0'),
  satuan:     z.string().min(1, 'Satuan wajib diisi'),
  harga:      z.coerce.number({ invalid_type_error: 'Masukkan angka' }).positive('Harga harus > 0'),
  nomorNota:  z.string().optional(),
  catatan:    z.string().optional(),
})

const FieldError = ({ msg }) => msg ? (
  <p className="error-msg">{msg}</p>
) : null

export default function TransactionFormPage() {
  const navigate = useNavigate()
  const { id }   = useParams()
  const isEdit   = !!id
  const qc       = useQueryClient()

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransaction(id),
    enabled: isEdit,
    select: r => r.data,
  })

  const { register, handleSubmit, watch, setValue, reset, control,
    formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tanggal: formatDateInput(),
      kategori: '', uraian: '', volume: '', satuan: 'Orang', harga: '', nomorNota: '', catatan: '',
    },
  })

  useEffect(() => {
    if (existing) reset({
      tanggal:   existing.tanggal,
      kategori:  existing.kategori,
      uraian:    existing.uraian,
      volume:    existing.volume,
      satuan:    existing.satuan,
      harga:     existing.harga,
      nomorNota: existing.nomorNota || '',
      catatan:   existing.catatan  || '',
    })
  }, [existing, reset])

  const volume = watch('volume')
  const harga  = watch('harga')
  const jumlah = (Number(volume) || 0) * (Number(harga) || 0)

  const mut = useMutation({
    mutationFn: (data) => isEdit ? updateTransaction(id, data) : addTransaction(data),
    onSuccess: () => {
      toast.success(isEdit ? 'Transaksi berhasil diperbarui' : 'Transaksi berhasil disimpan')
      qc.invalidateQueries({ queryKey: ['transactions'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      qc.invalidateQueries({ queryKey: ['rekap'] })
      navigate('/transaksi')
    },
    onError: (e) => toast.error(e.message),
  })

  const onSubmit = (data) => mut.mutate(data)

  if (isEdit && loadingExisting) return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-40" />
      {[1,2,3,4,5].map(i => <div key={i} className="card space-y-2"><div className="skeleton h-4 w-24" /><div className="skeleton h-12 w-full" /></div>)}
    </div>
  )

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} id="btn-back"
          className="btn-icon">
          <ArrowLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h1 className="page-title !mb-0">{isEdit ? 'Edit Transaksi' : 'Tambah Transaksi'}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Isi form dengan lengkap dan benar
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} id="form-transaksi" noValidate className="space-y-4">

        {/* Tanggal */}
        <div className="card space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Informasi Dasar</h2>

          <div className="form-group">
            <label className="label" htmlFor="input-tanggal">Tanggal *</label>
            <input id="input-tanggal" type="date" {...register('tanggal')}
              className={`input ${errors.tanggal ? 'input-error' : ''}`} />
            <FieldError msg={errors.tanggal?.message} />
          </div>

          {/* Kategori */}
          <div className="form-group">
            <label className="label">Kategori *</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => {
                const val = watch('kategori')
                const isSelected = val === cat.id
                return (
                  <button key={cat.id} type="button"
                    id={`kategori-${cat.id}`}
                    onClick={() => setValue('kategori', cat.id, { shouldValidate: true })}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-medium
                                transition-all duration-200 text-left
                                ${isSelected
                                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                }`}>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    {cat.label.split(' ').slice(0, 2).join(' ')}
                  </button>
                )
              })}
            </div>
            <FieldError msg={errors.kategori?.message} />
          </div>

          {/* Uraian */}
          <div className="form-group">
            <label className="label" htmlFor="input-uraian">Uraian / Keterangan *</label>
            <input id="input-uraian" type="text" {...register('uraian')}
              placeholder="Contoh: Makan siang peserta"
              className={`input ${errors.uraian ? 'input-error' : ''}`} />
            <FieldError msg={errors.uraian?.message} />
          </div>
        </div>

        {/* Volume & Harga */}
        <div className="card space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rincian Biaya</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="label" htmlFor="input-volume">Volume *</label>
              <input id="input-volume" type="number" inputMode="numeric" {...register('volume')}
                placeholder="0" min="0"
                className={`input ${errors.volume ? 'input-error' : ''}`} />
              <FieldError msg={errors.volume?.message} />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="input-satuan">Satuan *</label>
              <Controller name="satuan" control={control} render={({ field }) => (
                <select {...field} id="input-satuan"
                  className={`input ${errors.satuan ? 'input-error' : ''}`}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              )} />
              <FieldError msg={errors.satuan?.message} />
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="input-harga">Harga Satuan (Rp) *</label>
            <input id="input-harga" type="number" inputMode="numeric" {...register('harga')}
              placeholder="0" min="0"
              className={`input ${errors.harga ? 'input-error' : ''}`} />
            <FieldError msg={errors.harga?.message} />
          </div>

          {/* Auto total */}
          <motion.div
            animate={{ scale: jumlah > 0 ? [1, 1.02, 1] : 1 }}
            className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20
                       rounded-2xl border border-primary-200 dark:border-primary-800">
            <CalculatorIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">Total (otomatis)</p>
              <p className="text-xl font-bold text-primary-700 dark:text-primary-300">
                {formatRupiah(jumlah)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Opsional */}
        <div className="card space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Informasi Tambahan (Opsional)</h2>

          <div className="form-group">
            <label className="label" htmlFor="input-nomor-nota">Nomor Nota</label>
            <input id="input-nomor-nota" type="text" {...register('nomorNota')}
              placeholder="Contoh: NOT-001"
              className="input" />
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              💡 Pastikan nota fisik disimpan sebagai bukti transaksi
            </p>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="input-catatan">Catatan</label>
            <textarea id="input-catatan" {...register('catatan')}
              rows={3} placeholder="Keterangan tambahan..."
              className="input resize-none" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
            Batal
          </button>
          <motion.button type="submit" whileTap={{ scale: 0.97 }}
            id="btn-submit-transaksi"
            disabled={isSubmitting || mut.isPending}
            className="btn-primary flex-1 disabled:opacity-70 disabled:cursor-not-allowed">
            {mut.isPending ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyimpan...</>
            ) : isEdit ? 'Simpan Perubahan' : 'Simpan Transaksi'}
          </motion.button>
        </div>
      </form>
    </div>
  )
}
