import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/storefront/hooks/useCart'
import { formatCurrency } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/Button'
import { PageHero } from '@/storefront/components/layout/PageHero'

export function CartPage() {
  const { items, count, subtotal, removeItem, updateQty } = useCart()

  return (
    <div>
      <PageHero
        eyebrow="Bag"
        title={count ? `${count} item${count === 1 ? '' : 's'} in bag` : 'Your bag is empty'}
        description="Review items, then continue to checkout."
      />

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        {!count ? (
          <div className="rounded-2xl border border-dashed border-hm-border bg-hm-elevated p-10 text-center">
            <ShoppingBag className="mx-auto h-8 w-8 text-hm-accent" />
            <p className="mt-4 text-sm text-hm-text-muted">No items yet.</p>
            <Link to="/categories" className="mt-6 inline-block">
              <Button variant="primary">Shop gifts</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-4 rounded-2xl border border-hm-border bg-hm-elevated p-4 sm:flex-row sm:items-center"
              >
                <img src={item.image} alt="" className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-20" />
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${item.id}`} className="font-medium text-hm-text hover:text-hm-accent">
                    {item.name}
                  </Link>
                  {item.meta?.customText ? (
                    <p className="mt-1 text-xs text-hm-accent">Text: {item.meta.customText}</p>
                  ) : null}
                  <p className="mt-1 text-sm text-hm-text-muted">{formatCurrency(item.price)} each</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="inline-flex items-center rounded-lg border border-hm-border">
                    <button type="button" className="px-2 py-1.5" onClick={() => updateQty(item.key, item.qty - 1)}>
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button type="button" className="px-2 py-1.5" onClick={() => updateQty(item.key, item.qty + 1)}>
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">{formatCurrency(item.price * item.qty)}</p>
                    <button type="button" onClick={() => removeItem(item.key)} aria-label="Remove">
                      <Trash2 className="h-4 w-4 text-hm-text-muted hover:text-hm-danger" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-hm-border bg-hm-elevated p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-hm-text-muted">Subtotal</p>
                <p className="text-lg font-semibold text-hm-text">{formatCurrency(subtotal)}</p>
              </div>
              <Link to="/checkout" className="mt-4 block">
                <Button variant="primary" className="w-full" size="lg">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
