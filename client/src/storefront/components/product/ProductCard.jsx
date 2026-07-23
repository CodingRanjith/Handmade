import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/utils'
import { useCart } from '@/storefront/hooks/useCart'
import { StarRating } from '@/storefront/components/product/StarRating'
import { cn } from '@/shared/utils/cn'

/** Simple product card — no 3D / heavy motion */
export function ProductCard({ product, className }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const image = product.image || product.images?.[0]

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({ ...product, image, price: product.price })
  }

  function handleBuy(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({ ...product, image, price: product.price })
  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-hm-border bg-hm-elevated text-[1.05rem] shadow-hm-soft transition duration-300 hover:-translate-y-1 hover:border-hm-accent/40 hover:shadow-hm-card',
        className,
      )}
    >
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-[5/4] shrink-0 overflow-hidden bg-gradient-to-br from-hm-muted to-white"
      >
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {product.tag ? (
          <span className="absolute left-3.5 top-3.5 rounded-xl bg-hm-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            {product.tag}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Wishlist"
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-hm-primary shadow-hm-soft"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate('/wishlist')
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-h-[4.25rem]">
          <Link to={`/products/${product.id}`}>
            <h3 className="line-clamp-2 min-h-[2.75rem] text-[1.05rem] font-medium leading-snug text-hm-text hover:text-hm-primary">
              {product.name}
            </h3>
          </Link>
          {(typeof product.occasion === 'string'
            ? product.occasion
            : product.occasion?.[0]) || product.category ? (
            <p className="mt-1 line-clamp-1 text-[0.8125rem] text-hm-text-subtle">
              {typeof product.occasion === 'string'
                ? product.occasion
                : product.occasion?.[0] || product.category}
            </p>
          ) : null}
        </div>

        <div className="mt-auto pt-3">
          <div className="flex min-h-[2.75rem] items-end justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="text-xl font-semibold leading-tight text-hm-primary">
                  {formatCurrency(product.price)}
                </p>
                {product.offerPercent > 0 ||
                (product.compareAt && product.compareAt > product.price) ? (
                  <span className="rounded-md bg-hm-offer-muted px-1.5 py-0.5 text-[0.75rem] font-semibold text-hm-offer">
                    {product.offerPercent > 0
                      ? `${product.offerPercent}% off`
                      : `${Math.round(((product.compareAt - product.price) / product.compareAt) * 1000) / 10}% off`}
                  </span>
                ) : null}
              </div>
              <p
                className={cn(
                  'text-[0.8125rem] leading-tight text-hm-text-subtle line-through',
                  !product.compareAt && 'invisible',
                )}
              >
                {product.compareAt ? formatCurrency(product.compareAt) : '—'}
              </p>
            </div>
            <div
              className={cn(!product.rating && 'invisible')}
            >
              <StarRating rating={product.rating || 0} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-hm-border text-[0.8125rem] font-semibold text-hm-text hover:border-hm-accent hover:text-hm-primary"
            >
              <ShoppingBag className="h-4 w-4" />
              Add
            </button>
            <button
              type="button"
              onClick={handleBuy}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-hm-primary text-[0.8125rem] font-semibold text-white hover:bg-hm-primary-hover"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/** @deprecated use ProductCard */
export const ProductCard3D = ProductCard
