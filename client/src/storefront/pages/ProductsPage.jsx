import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  CATALOG_CATEGORIES,
  CATALOG_OCCASIONS,
  filterCatalog,
} from '@/storefront/data/catalog'
import { ProductCard3D } from '@/storefront/components/product/ProductCard3D'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'

function normalizeOccasion(value) {
  if (!value || value === 'All') return 'All'
  const match = CATALOG_OCCASIONS.find(
    (o) => o.toLowerCase() === String(value).toLowerCase(),
  )
  return match || 'All'
}

function useCatalogQuery() {
  const [params, setParams] = useSearchParams()

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
      const map = {
        search: 'q',
        category: 'category',
        occasion: 'occasion',
        sort: 'sort',
        inStock: 'inStock',
      }
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

  return { state, patch }
}

export function ProductsPage() {
  const { state, patch } = useCatalogQuery()
  const [mobileFilters, setMobileFilters] = useState(false)

  const products = useMemo(
    () =>
      filterCatalog({
        search: state.search,
        category: state.category,
        occasion: state.occasion,
        sort: state.sort,
        onlyInStock: state.inStock,
      }),
    [state],
  )

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hm-text-subtle">
          Category
        </p>
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
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hm-text-subtle">
          Occasion
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATALOG_OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => patch({ occasion: occ })}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition',
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
          className="h-4 w-4 rounded border-hm-border text-hm-accent focus:ring-hm-ring"
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
    <div className="min-h-svh">
      <section className="border-b border-hm-border bg-hm-muted/40 pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">Shop</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-hm-text sm:text-5xl md:text-6xl">
            All gifts
          </h1>
          <p className="mt-3 max-w-xl text-sm text-hm-text-muted sm:text-base">
            Filter by who it’s for, occasion, or style — then add to bag or buy now.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block flex-1">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hm-text-muted" />
              <input
                value={state.search}
                onChange={(e) => patch({ search: e.target.value })}
                placeholder="Search gifts, trays, hampers…"
                className="h-11 w-full rounded-hm-md border border-hm-border bg-hm-elevated pl-10 pr-3 text-sm outline-none focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
              />
            </label>
            <select
              value={state.sort}
              onChange={(e) => patch({ sort: e.target.value })}
              className="h-11 rounded-hm-md border border-hm-border bg-hm-elevated px-3 text-sm outline-none focus:border-hm-accent"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Top rated</option>
              <option value="newest">Newest</option>
            </select>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setMobileFilters(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-hm-xl border border-hm-border bg-hm-elevated p-5 shadow-hm-soft">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-hm-text">
              <Filter className="h-4 w-4 text-hm-accent" />
              Filters
            </div>
            {Filters}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-sm text-hm-text-muted">
              <span className="font-semibold text-hm-text">{products.length}</span> gifts
            </p>
            <Link to="/personalized-gifts" className="text-sm font-medium text-hm-accent">
              Need personalization help?
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-hm-xl border border-dashed border-hm-border bg-hm-elevated px-6 py-20 text-center">
              <p className="font-display text-2xl text-hm-text">No gifts match</p>
              <p className="mt-2 text-sm text-hm-text-muted">Try clearing filters or another search.</p>
              <Button
                variant="primary"
                className="mt-6"
                onClick={() =>
                  patch({
                    search: '',
                    category: 'All',
                    occasion: 'All',
                    sort: 'featured',
                    inStock: false,
                  })
                }
              >
                Reset
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard3D
                  key={product.id}
                  product={{
                    ...product,
                    image: product.images[0],
                    compareAt: product.compareAt,
                    occasion: product.occasion[0],
                  }}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFilters ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-hm-overlay"
            aria-label="Close filters"
            onClick={() => setMobileFilters(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="absolute inset-x-0 bottom-0 max-h-[80svh] overflow-y-auto rounded-t-3xl border border-hm-border bg-hm-elevated p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-hm-text">Filters</p>
              <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close">
                <X className="h-5 w-5 text-hm-text-muted" />
              </button>
            </div>
            {Filters}
            <Button
              variant="primary"
              className="mt-4 w-full"
              onClick={() => setMobileFilters(false)}
            >
              Show {products.length} gifts
            </Button>
          </motion.div>
        </div>
      ) : null}
    </div>
  )
}
