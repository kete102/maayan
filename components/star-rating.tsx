import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  count,
  size = 'md',
}: {
  rating: number
  count?: number
  size?: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Calificado ${rating} de 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              dim,
              i < rating ? 'fill-gold text-gold' : 'fill-none text-border',
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span
          className={cn(
            'font-light text-muted-foreground',
            size === 'sm' ? 'text-xs' : 'text-sm',
          )}
        >
          ({count})
        </span>
      )}
    </div>
  )
}
