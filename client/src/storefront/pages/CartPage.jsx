import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/storefront/hooks/useCart'
import { formatCurrency } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/Button'

export function CartPage() {
  const { items, count, subtotal, removeItem, updateQty } = useCart()

  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">Your bag</p>
        <h1 className="mt-2 font-display text-4xl text-hm-text sm:text-5xl">
          {count ? `${count} item${count === 1 ? '' : 's'} ready` : 'Your bag is empty'}
        </h1>
      </motion.div>

      {!count ? (
        <div className="mt-12 rounded-hm-xl border border-dashed border-hm-border bg-hm-elevated p-10 text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-hm-accent" />
          <p className="mt-4 text-sm text-hm-text-muted">
            Browse the shop and tap Add to bag or Buy now.
          </p>
          <Link to="/products" className="mt-6 inline-block">
            <Button variant="primary">
              Shop all gifts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.key}
              layout
              className="flex flex-col gap-4 rounded-hm-xl border border-hm-border bg-hm-elevated p-4 shadow-hm-soft sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt=""
                className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="font-medium text-hm-text hover:text-hm-accent"
                >
                  {item.name}
                </Link>
                {item.meta?.variants ? (
                  <p className="mt-1 text-xs text-hm-text-muted">
                    {Object.entries(item.meta.variants)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' · ')}
                  </p>
                ) : null}
                {item.meta?.customText ? (
                  <p className="mt-0.5 text-xs text-hm-accent">Text: {item.meta.customText}</p>
                ) : null}
                <p className="mt-1 text-sm text-hm-text-muted">{formatCurrency(item.price)} each</p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <div className="inline-flex items-center rounded-lg border border-hm-border">
                  <button
                    type="button"
                    className="px-2 py-1.5"
                    aria-label="Decrease"
                    onClick={() => updateQty(item.key, item.qty - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>
                  <button
                    type="button"
                    className="px-2 py-1.5"
                    aria-label="Increase"
                    onClick={() => updateQty(item.key, item.qty + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-hm-text">
                    {formatCurrency(item.price * item.qty)}
                  </p>
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => removeItem(item.key)}
                    className="text-hm-text-muted hover:text-hm-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="rounded-hm-xl border border-hm-border bg-hm-elevated p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-hm-text-muted">Subtotal</p>
              <p className="text-lg font-semibold text-hm-text">{formatCurrency(subtotal)}</p>
            </div>
            <Link to="/checkout" className="mt-4 block">
              <Button variant="primary" className="w-full" size="lg">
                Proceed to checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/products" className="mt-3 block text-center text-sm text-hm-accent">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
