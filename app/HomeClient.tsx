'use client'

import { useState } from 'react'
import ContactForm from '@/app/components/ContactForm'
import { ToastRoot, useToast } from '@/app/components/toast/ToastProvider'

export default function HomeClient() {
    const [showContact, setShowContact] = useState(false)
    const toast = useToast()

    return (
        <main className="min-h-screen bg-[#f2f2f2] text-gray-900">
            {/* Toasts */}
            <ToastRoot toasts={toast.toasts} onClose={toast.close} />

            {/* =========================
         BLOCK 1 — Intro
         ========================= */}
            <section className="max-w-7xl mx-auto px-6 pt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {/* Logo */}
                    <div>
                        <img
                            src="https://assets.accumachinery.com/logo/accu_logo_2-1.png"
                            alt="Accurate Machinery"
                            className="h-12 w-auto"
                        />
                    </div>
                    <div />

                    {/* Left text */}
                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                        <p>
                            Accurate Machinery is a Texas-based engineering and fabrication
                            company focused on precision manufacturing and industrial
                            solutions.
                        </p>
                        <p>
                            We work at the intersection of mechanical design, CNC machining,
                            tube bending, and custom fabrication.
                        </p>
                        <p>
                            Our projects range from automotive service equipment and modular
                            rack systems to precision components and tooling.
                        </p>
                        <p>
                            Every solution is built with a focus on reliability,
                            repeatability, and long-term serviceability.
                        </p>
                        <p>
                            We support both in-house development and contract manufacturing
                            for specialized applications.{' '}
                            <span
                                onClick={() => setShowContact((v) => !v)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                            >{showContact ? 'Hide Contact Form' : 'Contact Us'}</span>
                        </p>
                    </div>

                    {/* Right text */}
                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                        <p>
                            Our approach emphasizes practical engineering, clean execution,
                            and transparent collaboration with partners and clients.
                        </p>
                        <p>
                            We operate modern production workflows combining CAD/CAM,
                            metrology, and controlled fabrication processes.
                        </p>
                        <p>
                            Accurate Machinery develops and maintains multiple internal
                            product lines alongside custom industrial projects.
                        </p>
                        <p>
                            From early-stage concepts to production-ready systems, we focus
                            on scalable and maintainable designs.
                        </p>
                        <p>
                            Select projects are publicly documented and linked for reference
                            and collaboration.
                        </p>
                    </div>

                    {/* =========================
             Contact Form
             ========================= */}
                    {showContact && (
                        <div className="md:col-span-2 pt-10">
                            <ContactForm toast={toast} />
                        </div>
                    )}
                </div>
            </section>

            {/* =========================
         BLOCK 2 — Repeated info
         ========================= */}
            <section className="max-w-7xl mx-auto px-6 pt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    <div>
                        <img
                            src="https://assets.accumachinery.com/logo/accu_logo_2-1.png"
                            alt="Accurate Machinery"
                            className="h-12 w-auto"
                        />
                    </div>
                    <div />

                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                        <p>
                            Accurate Machinery is a Texas-based engineering and fabrication
                            company focused on precision manufacturing and industrial
                            solutions.
                        </p>
                        <p>
                            We work at the intersection of mechanical design, CNC machining,
                            tube bending, and custom fabrication.
                        </p>
                        <p>
                            Our projects range from automotive service equipment and modular
                            rack systems to precision components and tooling.
                        </p>
                        <p>
                            Every solution is built with a focus on reliability,
                            repeatability, and long-term serviceability.
                        </p>
                        <p>
                            We support both in-house development and contract manufacturing
                            for specialized applications.
                        </p>
                    </div>
                    <div />
                </div>
            </section>

            {/* =========================
         Divider + Footer
         ========================= */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                <div className="border-t border-gray-300 mb-10" />
                <div className="text-xs leading-relaxed text-gray-600 max-w-5xl">

                    <p><strong>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</strong></p>
                    <p>
                        Accurate Machinery is an independent engineering and fabrication
                        company based in Texas, specializing in precision manufacturing,
                        industrial tooling, and custom mechanical solutions.
                    </p>
                    <p>
                        Our work spans automotive service equipment, modular systems,
                        CNC-machined components, and production-ready assemblies developed
                        for long-term use.
                    </p>
                    <p>
                        We collaborate with manufacturers, engineers, and integrators to
                        deliver practical, scalable designs with a focus on reliability
                        and serviceability.
                    </p>
                    <p>
                        All trademarks, product names, and project references belong to
                        their respective owners.
                    </p>
                </div>
            </section>
        </main>
    )
}
