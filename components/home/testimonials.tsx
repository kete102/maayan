import { StarRating } from '@/components/star-rating'

const testimonials = [
  {
    quote:
      'El cuero es exquisito y el papel un placer para escribir. Se siente menos como un producto y más como un compañero para los años venideros.',
    name: 'Hannah R.',
    location: 'Nashville, TN',
  },
  {
    quote:
      'Maayan captura algo poco común — reverencia tranquila y verdadera artesanía. Mi Biblia de diario se ha convertido en el centro de mis mañanas.',
    name: 'David M.',
    location: 'Portland, OR',
  },
  {
    quote:
      'Le di la edición Gift of Grace a mi hija. La presentación fue hermosa y el significado detrás del nombre nos emocionó a ambas.',
    name: 'Grace L.',
    location: 'Austin, TX',
  },
]

export function Testimonials() {
  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Testimonios</p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light md:text-5xl">
            Amado por lectores en todo el mundo
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-6 bg-primary p-8"
            >
              <StarRating rating={5} />
              <blockquote className="flex-1 font-serif text-xl font-light italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm font-light text-primary-foreground/70">
                <span className="text-primary-foreground">{t.name}</span> — {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
