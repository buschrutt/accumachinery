'use client'

import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import type { ToastType } from './toast/ToastContainer'

/* =========================
   Types
   ========================= */
type ToastApi = {
    toasts: any[]
    push: (type: ToastType, message: string) => void
    close: (id: number) => void
}

type ContactFormProps = {
    toast: ToastApi
}

/* =========================
   Reusable fields
   ========================= */
function FormField({
                       label,
                       type = 'text',
                       value,
                       onChange,
                   }: {
    label: string
    type?: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <fieldset className="border border-gray-300 px-3 pb-3 pt-1 rounded-md">
            <legend className="px-1 text-xs tracking-wide text-gray-600">
                {label}
            </legend>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-800"
                autoComplete="off"
            />
        </fieldset>
    )
}

function TextAreaField({
                           label,
                           value,
                           onChange,
                       }: {
    label: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <fieldset className="border border-gray-300 px-3 pb-3 pt-1 rounded-md h-full">
            <legend className="px-1 text-xs tracking-wide text-gray-600">
                {label}
            </legend>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full resize-none bg-transparent outline-none text-sm text-gray-800"
            />
        </fieldset>
    )
}

/* =========================
   Contact Form
   ========================= */
export default function ContactForm({ toast }: ContactFormProps) {
    const { executeRecaptcha } = useGoogleReCaptcha()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [countryCode, setCountryCode] = useState('+')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)

    async function submit() {
        /* =========================
           Client-side validation
           ========================= */
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !topic.trim() ||
            !message.trim()
        ) {
            toast.push('error', 'All fields are required.')
            return
        }

        /* =========================
           reCAPTCHA v3
           ========================= */
        if (!executeRecaptcha) {
            toast.push('error', 'reCAPTCHA not ready.')
            return
        }

        setSending(true)

        try {
            const recaptchaToken = await executeRecaptcha('contact_form')

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    countryCode,
                    phone,
                    email,
                    topic,
                    message,
                    recaptchaToken,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data?.error || 'Failed to send message')
            }

            toast.push('success', 'Message sent successfully.')

            /* =========================
               Reset form
               ========================= */
            setFirstName('')
            setLastName('')
            setCountryCode('')
            setPhone('')
            setEmail('')
            setTopic('')
            setMessage('')
        } catch (err: any) {
            toast.push('error', err.message || 'Failed to send message.')
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" value={firstName} onChange={setFirstName} />
                    <FormField label="Last Name" value={lastName} onChange={setLastName} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        label="Country Code"
                        type="tel"
                        value={countryCode}
                        onChange={(v) => {
                            // оставляем только + и цифры
                            let clean = v.replace(/[^0-9+]/g, '')

                            // гарантируем +
                            if (!clean.startsWith('+')) {
                                clean = '+' + clean.replace(/\+/g, '')
                            }

                            // запрещаем пустое значение
                            if (clean === '') {
                                setCountryCode('+')
                                return
                            }

                            // ограничиваем длину (например: +9999)
                            if (clean.length > 5) return

                            setCountryCode(clean)
                        }}
                    />
                    <div className="col-span-2">
                        <FormField
                            label="Phone Number"
                            type="tel"
                            value={phone}
                            onChange={setPhone}
                        />
                    </div>
                </div>

                <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                />
            </div>

            {/* Right column */}
            <div className="grid grid-rows-[auto_1fr] gap-6">
                <FormField label="Topic" value={topic} onChange={setTopic} />
                <TextAreaField label="Message" value={message} onChange={setMessage} />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-2 flex justify-center">
                <button
                    type="button"
                    onClick={submit}
                    disabled={sending}
                    className={`text-sm uppercase tracking-wide transition-colors
            ${
                        sending
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                    {sending ? 'Sending…' : 'Submit'}
                </button>
            </div>
        </div>
    )
}
