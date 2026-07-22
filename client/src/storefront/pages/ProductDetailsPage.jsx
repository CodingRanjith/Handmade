import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShoppingBag,
  Star,
  Upload,
  Zap,
  ZoomIn,
} from 'lucide-react'
import {
  getCatalogProduct,
  getRelatedProducts,
  getUnitPrice,
  productReviews,
} from '@/storefront/data/catalog'
import { ProductCard3D } from '@/storefront/components/product/ProductCard3D'
import { pushRecentlyViewed, getRecentlyViewedIds } from '@/storefront/hooks/useRecentlyViewed'
import { useCart } from '@/storefront/hooks/useCart'
import { catalogProducts } from '@/storefront/data/catalog'
import { formatCurrency } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'

function initialVariantState(variants = {}) {
  return Object.fromEntries(
    Object.entries(variants).map(([key, options]) => [key, options[0]]),
  )
}

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getCatalogProduct(id)

  const [activeImage, setActiveImage] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [qty, setQty] = useState(1)
  const [variants, setVariants] = useState(() => initialVariantState(product?.variants))
  const [customText, setCustomText] = useState('')
  const [logoName, setLogoName] = useState('')
  const [imageName, setImageName] = useState('')
  const [wishlisted, setWishlisted] = useState(false)
  const [addedPulse, setAddedPulse] = useState(false)

  useEffect(() => {
    if (!product) return
    setActiveImage(0)
    setQty(1)
    setVariants(initialVariantState(product.variants))
    setCustomText('')
    setLogoName('')
    setImageName('')
    pushRecentlyViewed(product.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product?.id])

  const unitPrice = product ? getUnitPrice(product, qty) : 0
  const lineTotal = unitPrice * qty
  const related = product ? getRelatedProducts(product) : []
  const reviews = product ? productReviews[product.id] || [] : []

  const recentlyViewed = useMemo(() => {
    if (!product) return []
    return getRecentlyViewedIds()
      .filter((rid) => rid !== product.id)
      .map((rid) => catalogProducts.find((p) => p.id === rid))
      .filter(Boolean)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-lg flex-col items-center justify-center px-6 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">404</p>
        <h1 className="mt-3 font-display text-4xl text-hm-text">Gift not found</h1>
        <Link to="/products" className="mt-6">
          <Button variant="primary">Back to shop</Button>
        </Link>
      </div>
    )
  }

  function buildCartPayload() {
    return {
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: product.images[0],
      tag: product.tag,
      qty,
      meta: {
        variants,
        customText: customText || undefined,
        logoName: logoName || undefined,
        imageName: imageName || undefined,
      },
    }
  }

  function handleAdd() {
    addItem(buildCartPayload(), qty)
    setAddedPulse(true)
    window.setTimeout(() => setAddedPulse(false), 1200)
  }

  function handleBuy() {
    addItem(buildCartPayload(), qty)
    navigate('/cart')
  }

  return (
    <div className="pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-hm-text-muted transition hover:text-hm-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-hm-2xl border border-hm-border bg-hm-muted shadow-hm-card">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                initial={{ opacity: 0.4, scale: 1.04 }}
                animate={{
                  opacity: 1,
                  scale: spinning ? 1 : 1,
                  rotateY: spinning ? 360 : 0,
                }}
                transition={
                  spinning
                    ? { rotateY: { duration: 1.2, ease: 'easeInOut' } }
                    : { duration: 0.35 }
                }
                onAnimationComplete={() => setSpinning(false)}
                className="aspect-square w-full object-cover"
                style={{ transformStyle: 'preserve-3d' }}
              />

              <div className="absolute right-3 top-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-hm-elevated/90 text-hm-text shadow-hm-soft backdrop-blur"
                  aria-label="Zoom"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSpinning(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-hm-elevated/90 text-hm-text shadow-hm-soft backdrop-blur"
                  aria-label="360 preview"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-hm-elevated/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-hm-text backdrop-blur">
                {product.tag}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'overflow-hidden rounded-xl border-2 transition',
                    activeImage === index ? 'border-hm-accent' : 'border-transparent opacity-80 hover:opacity-100',
                  )}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase panel */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight text-hm-text sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-hm-text">
                <Star className="h-4 w-4 fill-hm-accent text-hm-accent" />
                {product.rating}
                <span className="text-hm-text-muted">({product.reviewCount} reviews)</span>
              </span>
              <span className="text-sm text-hm-text-muted">·</span>
              <span className="text-sm text-hm-text-muted">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-semibold tracking-tight text-hm-text">
                {formatCurrency(unitPrice)}
              </p>
              {product.compareAt && product.compareAt > unitPrice ? (
                <p className="pb-1 text-sm text-hm-text-subtle line-through">
                  {formatCurrency(product.compareAt)}
                </p>
              ) : null}
              {qty > 1 ? (
                <p className="pb-1 text-sm text-hm-text-muted">
                  Total {formatCurrency(lineTotal)}
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-hm-text-muted">{product.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-hm-border bg-hm-elevated px-3 py-1 text-xs text-hm-text-muted"
                >
                  {f}
                </li>
              ))}
            </ul>

            {/* Variants */}
            <div className="mt-8 space-y-4">
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
                          'rounded-full border px-3.5 py-2 text-sm transition',
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

            {/* Qty */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hm-text-subtle">
                Quantity
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="inline-flex items-center rounded-hm-md border border-hm-border bg-hm-elevated">
                  <button
                    type="button"
                    aria-label="Decrease"
                    className="px-3 py-2.5 text-hm-text"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold text-hm-text">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase"
                    className="px-3 py-2.5 text-hm-text"
                    onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {product.bulkPricing?.length > 1 ? (
                  <p className="text-xs text-hm-text-muted">
                    Bulk from {formatCurrency(product.bulkPricing.at(-1).price)}
                  </p>
                ) : null}
              </div>

              {product.bulkPricing?.length > 1 ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-hm-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-hm-muted/60 text-hm-text-muted">
                      <tr>
                        <th className="px-3 py-2 font-medium">Qty</th>
                        <th className="px-3 py-2 font-medium">Unit price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.bulkPricing.map((tier) => (
                        <tr
                          key={tier.minQty}
                          className={cn(
                            'border-t border-hm-border',
                            qty >= tier.minQty && 'bg-hm-accent/10',
                          )}
                        >
                          <td className="px-3 py-2 text-hm-text">{tier.minQty}+</td>
                          <td className="px-3 py-2 font-medium text-hm-text">
                            {formatCurrency(tier.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            {/* Personalization */}
            {(product.personalization?.customText ||
              product.personalization?.uploadLogo ||
              product.personalization?.uploadImage) && (
              <div className="mt-8 rounded-hm-xl border border-hm-border bg-hm-elevated p-4 sm:p-5">
                <p className="text-sm font-semibold text-hm-text">Personalize (optional)</p>
                <p className="mt-1 text-xs text-hm-text-muted">
                  Make it theirs — text, logo, or image.
                </p>

                {product.personalization.customText ? (
                  <label className="mt-4 block">
                    <span className="text-xs text-hm-text-muted">
                      Custom text (max {product.personalization.maxChars})
                    </span>
                    <input
                      value={customText}
                      maxLength={product.personalization.maxChars}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. For Ananya"
                      className="mt-1.5 h-10 w-full rounded-lg border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
                    />
                  </label>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.personalization.uploadLogo ? (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-hm-border bg-hm-bg px-3 py-2 text-xs font-medium text-hm-text transition hover:border-hm-accent">
                      <Upload className="h-3.5 w-3.5" />
                      {logoName || 'Upload logo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setLogoName(e.target.files?.[0]?.name || '')}
                      />
                    </label>
                  ) : null}
                  {product.personalization.uploadImage ? (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-hm-border bg-hm-bg px-3 py-2 text-xs font-medium text-hm-text transition hover:border-hm-accent">
                      <Upload className="h-3.5 w-3.5" />
                      {imageName || 'Upload image'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageName(e.target.files?.[0]?.name || '')}
                      />
                    </label>
                  ) : null}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                size="lg"
                onClick={handleAdd}
                disabled={product.stock < 1}
                className="relative"
              >
                {addedPulse ? <Check className="h-4 w-4 text-hm-success" /> : <ShoppingBag className="h-4 w-4" />}
                Add to bag
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleBuy}
                disabled={product.stock < 1}
              >
                <Zap className="h-4 w-4" />
                Buy now
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWishlisted((w) => !w)}
                className={cn(wishlisted && 'text-hm-accent')}
              >
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
                  } else {
                    await navigator.clipboard.writeText(url)
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <p className="mt-4 text-xs text-hm-text-muted">{product.shippingNote}</p>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20 border-t border-hm-border pt-12">
          <h2 className="font-display text-3xl text-hm-text">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="mt-4 text-sm text-hm-text-muted">Be the first to review this gift.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <blockquote
                  key={review.id}
                  className="rounded-hm-xl border border-hm-border bg-hm-elevated p-5 shadow-hm-soft"
                >
                  <div className="flex items-center gap-1 text-hm-accent">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-hm-text">“{review.text}”</p>
                  <footer className="mt-3 text-xs text-hm-text-muted">
                    {review.name} · {review.date}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </section>

        {/* Related */}
        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl text-hm-text">Related gifts</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, index) => (
                <ProductCard3D
                  key={p.id}
                  index={index}
                  product={{
                    ...p,
                    image: p.images[0],
                    occasion: p.occasion[0],
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl text-hm-text">Recently viewed</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewed.map((p, index) => (
                <ProductCard3D
                  key={p.id}
                  index={index}
                  product={{
                    ...p,
                    image: p.images[0],
                    occasion: p.occasion[0],
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Zoom lightbox */}
      <AnimatePresence>
        {zoomOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setZoomOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="max-h-[90svh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
