import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Upload,
  Zap,
  ZoomIn,
} from 'lucide-react'
import {
  getUnitPrice,
  productReviews,
} from '@/storefront/data/catalog'
import {
  getStorefrontProduct,
  getStorefrontProducts,
  getStorefrontRelated,
} from '@/shared/catalog/liveCatalog'
import { ProductCard } from '@/storefront/components/product/ProductCard'
import { pushRecentlyViewed, getRecentlyViewedIds } from '@/storefront/hooks/useRecentlyViewed'
import { useCart } from '@/storefront/hooks/useCart'
import { formatCurrency } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'

function initialVariants(variants = {}) {
  return Object.fromEntries(Object.entries(variants).map(([k, opts]) => [k, opts[0]]))
}

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getStorefrontProduct(id)

  const [activeImage, setActiveImage] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [variants, setVariants] = useState(() => initialVariants(product?.variants))
  const [customText, setCustomText] = useState('')
  const [logoName, setLogoName] = useState('')
  const [imageName, setImageName] = useState('')
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    if (!product) return
    setActiveImage(0)
    setQty(1)
    setVariants(initialVariants(product.variants))
    setCustomText('')
    setLogoName('')
    setImageName('')
    pushRecentlyViewed(product.id)
    window.scrollTo(0, 0)
  }, [product?.id])

  const unitPrice = product ? getUnitPrice(product, qty) : 0
  const related = product ? getStorefrontRelated(product) : []
  const reviews = product ? productReviews[product.id] || [] : []
  const recentlyViewed = useMemo(() => {
    if (!product) return []
    const all = getStorefrontProducts()
    return getRecentlyViewedIds()
      .filter((rid) => rid !== product.id)
      .map((rid) => all.find((p) => p.id === rid))
      .filter(Boolean)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-lg flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-hm-text">Gift not found</h1>
        <Link to="/categories" className="mt-6">
          <Button variant="primary">Back to shop</Button>
        </Link>
      </div>
    )
  }

  function payload() {
    return {
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: product.images[0],
      tag: product.tag,
      meta: {
        variants,
        customText: customText || undefined,
        logoName: logoName || undefined,
        imageName: imageName || undefined,
      },
    }
  }

  return (
    <div className="pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-hm-text-muted hover:text-hm-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-hm-border bg-hm-muted">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-hm-elevated/95"
                aria-label="Zoom"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <span className="absolute left-3 top-3 rounded-full bg-hm-elevated/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                {product.tag}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'overflow-hidden rounded-xl border-2',
                    activeImage === i ? 'border-hm-accent' : 'border-transparent',
                  )}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-4xl text-hm-text sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 font-medium text-hm-text">
                <Star className="h-4 w-4 fill-hm-accent text-hm-accent" />
                {product.rating}
              </span>
              <span className="text-hm-text-muted">({product.reviewCount} reviews)</span>
              <span className="text-hm-text-muted">· {product.stock} in stock</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-semibold text-hm-text">{formatCurrency(unitPrice)}</p>
              {product.compareAt && product.compareAt > unitPrice ? (
                <p className="pb-1 text-sm text-hm-text-subtle line-through">
                  {formatCurrency(product.compareAt)}
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-hm-text-muted">{product.description}</p>

            <div className="mt-6 space-y-4">
              {Object.entries(product.variants || {}).map(([key, options]) => (
                <div key={key}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hm-text-subtle">
                    {key}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setVariants((v) => ({ ...v, [key]: opt }))}
                        className={cn(
                          'rounded-full border px-3.5 py-2 text-sm',
                          variants[key] === opt
                            ? 'border-hm-primary bg-hm-primary text-hm-bg-elevated'
                            : 'border-hm-border text-hm-text hover:border-hm-accent',
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hm-text-subtle">
                Quantity
              </p>
              <div className="mt-2 inline-flex items-center rounded-xl border border-hm-border">
                <button type="button" className="px-3 py-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
                <button type="button" className="px-3 py-2.5" onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {product.bulkPricing?.length > 1 ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-hm-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-hm-muted/60 text-hm-text-muted">
                      <tr>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Unit price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.bulkPricing.map((tier) => (
                        <tr key={tier.minQty} className="border-t border-hm-border">
                          <td className="px-3 py-2">{tier.minQty}+</td>
                          <td className="px-3 py-2 font-medium">{formatCurrency(tier.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            {(product.personalization?.customText ||
              product.personalization?.uploadLogo ||
              product.personalization?.uploadImage) && (
              <div className="mt-6 rounded-2xl border border-hm-border bg-hm-elevated p-4">
                <p className="text-sm font-semibold text-hm-text">Personalize (optional)</p>
                {product.personalization.customText ? (
                  <input
                    value={customText}
                    maxLength={product.personalization.maxChars}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Custom text"
                    className="mt-3 h-10 w-full rounded-lg border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent"
                  />
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.personalization.uploadLogo ? (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-hm-border px-3 py-2 text-xs font-medium">
                      <Upload className="h-3.5 w-3.5" />
                      {logoName || 'Upload logo'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setLogoName(e.target.files?.[0]?.name || '')} />
                    </label>
                  ) : null}
                  {product.personalization.uploadImage ? (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-hm-border px-3 py-2 text-xs font-medium">
                      <Upload className="h-3.5 w-3.5" />
                      {imageName || 'Upload image'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageName(e.target.files?.[0]?.name || '')} />
                    </label>
                  ) : null}
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" size="lg" onClick={() => addItem(payload(), qty)}>
                <ShoppingBag className="h-4 w-4" />
                Add to bag
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  addItem(payload(), qty)
                  navigate('/cart')
                }}
              >
                <Zap className="h-4 w-4" />
                Buy now
              </Button>
            </div>

            <div className="mt-3 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setWishlisted((w) => !w)} className={cn(wishlisted && 'text-hm-accent')}>
                <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} />
                Wishlist
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  const url = window.location.href
                  if (navigator.share) {
                    try {
                      await navigator.share({ title: product.name, url })
                    } catch {
                      /* ignore */
                    }
                  } else await navigator.clipboard.writeText(url)
                }}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <p className="mt-4 text-xs text-hm-text-muted">{product.shippingNote}</p>
          </div>
        </div>

        <section className="mt-16 border-t border-hm-border pt-10">
          <h2 className="font-display text-3xl text-hm-text">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="mt-3 text-sm text-hm-text-muted">No reviews yet.</p>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {reviews.map((r) => (
                <blockquote key={r.id} className="rounded-2xl border border-hm-border bg-hm-elevated p-5">
                  <p className="text-sm text-hm-text">“{r.text}”</p>
                  <footer className="mt-3 text-xs text-hm-text-muted">
                    {r.name} · {r.date}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </section>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-3xl text-hm-text">Related gifts</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={{ ...p, image: p.images[0], occasion: p.occasion[0] }} />
              ))}
            </div>
          </section>
        ) : null}

        {recentlyViewed.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-3xl text-hm-text">Recently viewed</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={{ ...p, image: p.images[0], occasion: p.occasion[0] }} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {zoomOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomOpen(false)}
          role="presentation"
        >
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="max-h-[90svh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  )
}
