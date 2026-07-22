import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, ShoppingBag, Zap } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/utils'
import { useCart } from '@/storefront/hooks/useCart'
import { cn } from '@/shared/utils/cn'

/**
 * 3D tilt product card with Add to Cart + Buy Now.
 */
export function ProductCard3D({ product, index = 0 }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const ref = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 22 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 220, damping: 22 })
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      ...product,
      image: product.image || product.images?.[0],
      price: product.price,
    })
  }

  function handleBuy(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      ...product,
      image: product.image || product.images?.[0],
      price: product.price,
    })
    navigate('/cart')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative rounded-hm-xl"
      >
        <div
          className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-hm-accent/15 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
          style={{ transform: 'translateZ(-40px)' }}
        />

        <div className="overflow-hidden rounded-hm-xl border border-hm-border bg-hm-elevated shadow-hm-card">
          <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden">
            <motion.img
              src={product.image || product.images?.[0]}
              alt={product.name}
              loading="lazy"
              style={{ transform: 'translateZ(28px)' }}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <motion.div
              style={{ background: glare, transform: 'translateZ(40px)' }}
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

            <span
              className={cn(
                'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur',
                'bg-hm-elevated/90 text-hm-text',
              )}
              style={{ transform: 'translateZ(48px)' }}
            >
              {product.tag}
            </span>

            <button
              type="button"
              aria-label="Wishlist"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-hm-elevated/90 text-hm-text backdrop-blur transition hover:text-hm-accent"
              style={{ transform: 'translateZ(48px)' }}
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4" />
            </button>
          </Link>

          <div className="space-y-3 p-4" style={{ transform: 'translateZ(20px)' }}>
            <div>
              <Link to={`/products/${product.id}`}>
                <h3 className="text-base font-medium text-hm-text transition hover:text-hm-accent">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-0.5 text-xs text-hm-text-subtle">{product.occasion || 'Ready to gift'}</p>
            </div>

            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-lg font-semibold tracking-tight text-hm-text">
                  {formatCurrency(product.price)}
                </p>
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

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-hm-md border border-hm-border bg-hm-bg text-xs font-semibold text-hm-text transition hover:border-hm-accent hover:text-hm-accent active:scale-[0.98]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to bag
              </button>
              <button
                type="button"
                onClick={handleBuy}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-hm-md bg-hm-primary text-xs font-semibold text-hm-bg-elevated transition hover:bg-hm-primary-hover active:scale-[0.98]"
              >
                <Zap className="h-3.5 w-3.5" />
                Buy now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
