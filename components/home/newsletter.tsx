'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Mantente Conectado</p>
        <h2 className="mt-3 text-balance font-serif text-4xl font-light md:text-5xl">
          Reflexiones, entregadas con delicadeza
        </h2>
        <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
          Recibe reflexiones bíblicas, lanzamientos de nuevas ediciones y ofertas tranquilas.
          Sin ruido — solo lo que nutre.
        </p>

        {submitted ? (
          <p className="mt-8 inline-flex items-center gap-2 text-ocean">
            <Check className="h-5 w-5" />
            Gracias. Tu primera reflexión está en camino.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 border border-border bg-card px-4 py-3.5 text-sm outline-none transition-colors focus:border-ocean"
            />
            <button
              type="submit"
              className="bg-primary px-6 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
