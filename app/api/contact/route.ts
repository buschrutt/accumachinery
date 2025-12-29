import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {
            firstName,
            lastName,
            countryCode,
            phone,
            email,
            topic,
            message,
            recaptchaToken,
        } = body

        /* =========================
           Basic validation
           ========================= */
        if (!email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        /* =========================
           reCAPTCHA v3 verification
           ========================= */
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: 'Missing reCAPTCHA token' },
                { status: 400 }
            )
        }

        const googleRes = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY!,
                    response: recaptchaToken,
                }),
            }
        )

        const recaptchaData = await googleRes.json()

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.warn('reCAPTCHA failed:', recaptchaData)

            return NextResponse.json(
                { error: 'reCAPTCHA verification failed' },
                { status: 403 }
            )
        }

        /* =========================
           Mail transport
           ========================= */
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: true,
            },
        })

        /* =========================
           Send email
           ========================= */
        await transporter.sendMail({
            from: `Accurate Machinery <${process.env.SMTP_FROM}>`,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `[Contact] ${topic || 'New message'}`,
            text: `
First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Phone: ${countryCode} ${phone}

Message:
${message}
      `,
        })

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error('Contact form error:', err)

        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
