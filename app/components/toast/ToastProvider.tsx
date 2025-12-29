'use client'

import { useState } from 'react'
import { Toast, ToastType, ToastContainer } from './ToastContainer'

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])

    function push(type: ToastType, message: string) {
        const id = Date.now()
        setToasts((t) => [...t, { id, type, message }])

        setTimeout(() => {
            setToasts((t) => t.filter((toast) => toast.id !== id))
        }, 3000)
    }

    function close(id: number) {
        setToasts((t) => t.filter((toast) => toast.id !== id))
    }

    return {
        toasts,
        push,
        close,
    }
}

export function ToastRoot({
                              toasts,
                              onClose,
                          }: {
    toasts: Toast[]
    onClose: (id: number) => void
}) {
    return <ToastContainer toasts={toasts} onClose={onClose} />
}
