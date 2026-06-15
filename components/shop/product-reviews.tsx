import { StarRating } from '@/components/star-rating'
import type { Product } from '@/lib/products'

const sampleReviews = [
  {
    name: 'Rebecca T.',
    rating: 5,
    date: 'Marzo 2025',
    title: 'Un tesoro para los años venideros',
    body: 'La artesanía es notable. El cuero se siente sustancial y los bordes dorados son impecables. Se ha convertido en el centro de mi tiempo devocional.',
  },
  {
    name: 'Samuel K.',
    rating: 5,
    date: 'Febrero 2025',
    title: 'Hermosa y construida para durar',
    body: 'He tenido muchas Biblias a lo largo de los años y ninguna se compara con esta. La calidad del papel y la encuadernación son excepcionales. Vale cada centavo.',
  },
  {
    name: 'Maria G.',
    rating: 4,
    date: 'Enero 2025',
    title: 'Un regalo encantador',
    body: 'Se la regalé a mi esposo y se emocionó tanto con la calidad como con el significado detrás del nombre Maayan. El envío fue rápido y el embalaje elegante.',
  },
]

export function ProductReviews({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-serif text-3xl font-light">Reseñas</h2>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-5xl">{product.rating.toFixed(1)}</span>
            <div>
              <StarRating rating={product.rating} />
              <p className="mt-1 text-sm text-muted-foreground">
                {product.reviewCount} reseñas
              </p>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {sampleReviews.map((review) => (
            <li key={review.name} className="py-6 first:pt-0">
              <StarRating rating={review.rating} />
              <h3 className="mt-3 font-serif text-xl">{review.title}</h3>
              <p className="mt-2 font-light leading-relaxed text-muted-foreground">
                {review.body}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                {review.name} — {review.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
