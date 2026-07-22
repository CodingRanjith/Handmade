import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/utils'
import { useCart } from '@/storefront/hooks/useCart'
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
    navigate('/cart')
  }

  return (
    <article className={cn('group overflow-hidden rounded-2xl border border-hm-border bg-hm-elevated', className)}>
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-hm-muted">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {product.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-hm-elevated/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-hm-text">
            {product.tag}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-hm-elevated/95 text-hm-text"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate('/wishlist')
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-base font-medium text-hm-text hover:text-hm-accent">{product.name}</h3>
          </Link>
          <p className="mt-0.5 text-xs text-hm-text-subtle">
            {typeof product.occasion === 'string'
              ? product.occasion
              : product.occasion?.[0] || 'Ready to gift'}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-semibold text-hm-text">{formatCurrency(product.price)}</p>
            {product.compareAt ? (
              <p className="text-xs text-hm-text-subtle line-through">
                {formatCurrency(product.compareAt)}
              </p>
            ) : null}
          </div>
          {product.rating ? (
            <p className="text-xs font-medium text-hm-accent">★ {product.rating}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-hm-border text-xs font-semibold text-hm-text hover:border-hm-accent"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
          <button
            type="button"
            onClick={handleBuy}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-hm-primary text-xs font-semibold text-hm-bg-elevated hover:bg-hm-primary-hover"
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  )
}

/** @deprecated use ProductCard */
export const ProductCard3D = ProductCard
