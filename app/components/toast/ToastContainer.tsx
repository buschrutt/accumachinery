'use client'

export type ToastType = 'success' | 'error'

export type Toast = {
    id: number
    type: ToastType
    message: string
}

export function ToastContainer({
                                   toasts,
                                   onClose,
                               }: {
    toasts: Toast[]
    onClose: (id: number) => void
}) {
    return (
        <div className="fixed top-6 right-6 z-50 space-y-3">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`relative px-5 py-4 pr-10 rounded-lg text-sm text-white shadow-lg
            ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
          `}
                >
                    <button
                        onClick={() => onClose(toast.id)}
                        className="absolute top-2 right-3 text-white/80 hover:text-white text-xs"
                    >
                        ✕
                    </button>
                    {toast.message}
                </div>
            ))}
        </div>
    )
}
