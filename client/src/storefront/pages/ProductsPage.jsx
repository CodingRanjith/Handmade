import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  CATALOG_CATEGORIES,
  CATALOG_OCCASIONS,
  filterCatalog,
} from '@/storefront/data/catalog'
import { ProductCard } from '@/storefront/components/product/ProductCard'
import { PageHero } from '@/storefront/components/layout/PageHero'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'

function normalizeOccasion(value) {
  if (!value || value === 'All') return 'All'
  return (
    CATALOG_OCCASIONS.find((o) => o.toLowerCase() === String(value).toLowerCase()) || 'All'
  )
}

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const [mobileFilters, setMobileFilters] = useState(false)

  const state = {
    search: params.get('q') || '',
    category: params.get('category') || 'All',
    occasion: normalizeOccasion(params.get('occasion')),
    sort: params.get('sort') || 'featured',
    inStock: params.get('inStock') === '1',
  }

  function patch(updates) {
    const next = new URLSearchParams(params)
    Object.entries(updates).forEach(([key, value]) => {
      const map = { search: 'q', category: 'category', occasion: 'occasion', sort: 'sort', inStock: 'inStock' }
      const paramKey = map[key] || key
      if (paramKey === 'inStock') {
        if (value) next.set('inStock', '1')
        else next.delete('inStock')
        return
      }
      if (paramKey === 'sort') {
        if (!value || value === 'featured') next.delete('sort')
        else next.set('sort', String(value))
        return
      }
      if (!value || value === 'All') next.delete(paramKey)
      else next.set(paramKey, String(value))
    })
    setParams(next, { replace: true })
  }

  const products = useMemo(
    () =>
      filterCatalog({
        search: state.search,
        category: state.category,
        occasion: state.occasion,
        sort: state.sort,
        onlyInStock: state.inStock,
      }),
    [state.search, state.category, state.occasion, state.sort, state.inStock],
  )

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hm-text-subtle">Category</p>
        <div className="mt-3 flex flex-col gap-1.5">
          {CATALOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => patch({ category: cat })}
              className={cn(
                'rounded-lg px-3 py-2 text-left text-sm transition',
                state.category === cat
                  ? 'bg-hm-primary text-hm-bg-elevated'
                  : 'text-hm-text-muted hover:bg-hm-muted hover:text-hm-text',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hm-text-subtle">Occasion</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATALOG_OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => patch({ occasion: occ })}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium',
                state.occasion === occ
                  ? 'border-hm-accent bg-hm-accent/15 text-hm-text'
                  : 'border-hm-border text-hm-text-muted hover:border-hm-accent',
              )}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-hm-text">
        <input
          type="checkbox"
          checked={state.inStock}
          onChange={(e) => patch({ inStock: e.target.checked })}
          className="h-4 w-4 rounded border-hm-border"
        />
        In stock only
      </label>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() =>
          patch({ search: '', category: 'All', occasion: 'All', sort: 'featured', inStock: false })
        }
      >
        Clear filters
      </Button>
    </div>
  )

  return (
    <div>
      <PageHero
        eyebrow="Shop"
        title="All gifts"
        description="Filter by category or occasion — then add to bag or buy now."
      />

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hm-text-muted" />
            <input
              value={state.search}
              onChange={(e) => patch({ search: e.target.value })}
              placeholder="Search gifts…"
              className="h-11 w-full rounded-xl border border-hm-border bg-hm-elevated pl-10 pr-3 text-sm outline-none focus:border-hm-accent"
            />
          </label>
          <select
            value={state.sort}
            onChange={(e) => patch({ sort: e.target.value })}
            className="h-11 rounded-xl border border-hm-border bg-hm-elevated px-3 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>
          <Button variant="outline" className="lg:hidden" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-hm-border bg-hm-elevated p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-hm-text">
              <Filter className="h-4 w-4 text-hm-accent" />
              Filters
            </div>
            {Filters}
          </div>
        </aside>

        <div>
          <p className="mb-5 text-sm text-hm-text-muted">
            <span className="font-semibold text-hm-text">{products.length}</span> gifts
          </p>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-hm-border p-12 text-center">
              <p className="font-display text-2xl text-hm-text">No gifts match</p>
              <Button variant="primary" className="mt-4" onClick={() => patch({ search: '', category: 'All', occasion: 'All' })}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    image: product.images[0],
                    occasion: product.occasion[0],
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFilters ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-hm-overlay" aria-label="Close" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[80svh] overflow-y-auto rounded-t-3xl border border-hm-border bg-hm-elevated p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-hm-text">Filters</p>
              <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
            <Button variant="primary" className="mt-4 w-full" onClick={() => setMobileFilters(false)}>
              Show {products.length} gifts
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
