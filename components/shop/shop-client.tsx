'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import {
  products as allProducts,
  collections,
  translations,
  coverTypes,
  formats,
  languages,
} from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type FilterGroupProps = {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  labelFor?: (value: string) => string
}

function FilterGroup({ title, options, selected, onToggle, labelFor }: FilterGroupProps) {
  return (
    <div className="border-b border-border py-6">
      <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {options.map((option) => {
          const checked = selected.includes(option)
          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-light">
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center border transition-colors',
                    checked
                      ? 'border-ocean bg-ocean'
                      : 'border-border bg-transparent',
                  )}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-background">
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggle(option)}
                />
                {labelFor ? labelFor(option) : option}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const priceRanges = [
  { label: 'Menos de $80', min: 0, max: 80 },
  { label: '$80 – $130', min: 80, max: 130 },
  { label: '$130 – $180', min: 130, max: 180 },
  { label: 'Más de $180', min: 180, max: Infinity },
]

export function ShopClient({
  initialCollection,
}: {
  initialCollection?: string
}) {
  const [query, setQuery] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    initialCollection ? [initialCollection] : [],
  )
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [selectedCovers, setSelectedCovers] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [sort, setSort] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    const result = allProducts.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if (selectedCollections.length && !selectedCollections.includes(p.collection))
        return false
      if (selectedTranslations.length && !selectedTranslations.includes(p.translation))
        return false
      if (selectedFormats.length && !selectedFormats.includes(p.format)) return false
      if (selectedCovers.length && !selectedCovers.includes(p.coverType)) return false
      if (selectedLanguages.length && !selectedLanguages.includes(p.language))
        return false
      if (selectedPrices.length) {
        const inRange = priceRanges
          .filter((r) => selectedPrices.includes(r.label))
          .some((r) => p.price >= r.min && p.price < r.max)
        if (!inRange) return false
      }
      return true
    })

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)

    return result
  }, [
    query,
    selectedCollections,
    selectedTranslations,
    selectedFormats,
    selectedCovers,
    selectedLanguages,
    selectedPrices,
    sort,
  ])

  const activeCount =
    selectedCollections.length +
    selectedTranslations.length +
    selectedFormats.length +
    selectedCovers.length +
    selectedLanguages.length +
    selectedPrices.length

  function clearAll() {
    setSelectedCollections([])
    setSelectedTranslations([])
    setSelectedFormats([])
    setSelectedCovers([])
    setSelectedLanguages([])
    setSelectedPrices([])
  }

  const filterPanel = (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="font-serif text-2xl font-light">Filtros</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs uppercase tracking-wide text-ocean hover:underline"
          >
            Limpiar ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup
        title="Colección"
        options={collections.map((c) => c.slug)}
        selected={selectedCollections}
        onToggle={(v) => toggle(selectedCollections, setSelectedCollections, v)}
        labelFor={(slug) => collections.find((c) => c.slug === slug)?.name ?? slug}
      />
      <FilterGroup
        title="Traducción"
        options={translations}
        selected={selectedTranslations}
        onToggle={(v) => toggle(selectedTranslations, setSelectedTranslations, v)}
      />
      <FilterGroup
        title="Formato"
        options={formats}
        selected={selectedFormats}
        onToggle={(v) => toggle(selectedFormats, setSelectedFormats, v)}
      />
      <FilterGroup
        title="Tipo de Cubierta"
        options={coverTypes}
        selected={selectedCovers}
        onToggle={(v) => toggle(selectedCovers, setSelectedCovers, v)}
      />
      <FilterGroup
        title="Idioma"
        options={languages}
        selected={selectedLanguages}
        onToggle={(v) => toggle(selectedLanguages, setSelectedLanguages, v)}
      />
      <FilterGroup
        title="Precio"
        options={priceRanges.map((r) => r.label)}
        selected={selectedPrices}
        onToggle={(v) => toggle(selectedPrices, setSelectedPrices, v)}
      />
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar Biblias..."
            className="w-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-ocean"
          />
        </div>
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 border border-border px-4 py-2.5 text-sm lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros{activeCount > 0 && ` (${activeCount})`}
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {filtered.length} resultados
            </span>
            <label htmlFor="sort" className="sr-only">
              Ordenar por
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-ocean"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: de menor a mayor</option>
              <option value="price-desc">Precio: de mayor a menor</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-10">
        <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center gap-3 text-center">
              <p className="font-serif text-2xl text-muted-foreground">
                Ninguna Biblia coincide con tus filtros.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm uppercase tracking-[0.2em] text-ocean hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* cajón de filtros móvil */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileFiltersOpen ? '' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity',
            mobileFiltersOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileFiltersOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            'absolute left-0 top-0 h-dvh w-full max-w-xs overflow-y-auto bg-background p-6 transition-transform',
            mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Cerrar filtros"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {filterPanel}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="mt-6 w-full bg-primary py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground"
          >
            Mostrar {filtered.length} resultados
          </button>
        </div>
      </div>
    </div>
  )
}
