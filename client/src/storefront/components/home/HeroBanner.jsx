import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { formatCurrency } from '@/shared/lib/utils'
import { heroProducts } from '@/storefront/data/home'
import { useCart } from '@/storefront/hooks/useCart'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=2000&q=80'

function FloatingGiftCard({ product, className, delay = 0, depth = 0 }) {
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -18 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 0.35 + delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotateZ: [depth * -1, depth, depth * -1] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[180px] overflow-hidden rounded-2xl border border-white/25 bg-hm-elevated/90 shadow-hm-elevated backdrop-blur-xl sm:w-[200px]"
        style={{ transform: `translateZ(${40 + depth * 10}px)` }}
      >
        <div className="relative aspect-[4/5]">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3 text-white">
            <p className="truncate text-sm font-medium">{product.name}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-xs text-white/85">{formatCurrency(product.price)}</p>
              <button
                type="button"
                onClick={() => addItem(product)}
                className="inline-flex h-8 items-center gap-1 rounded-full bg-white/95 px-2.5 text-[10px] font-semibold text-hm-primary transition hover:bg-white"
              >
                <ShoppingBag className="h-3 w-3" />
                Add
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HeroBanner() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18 })
  const sy = useSpring(my, { stiffness: 55, damping: 18 })
  const layerX = useTransform(sx, [-0.5, 0.5], [-22, 22])
  const layerY = useTransform(sy, [-0.5, 0.5], [-14, 14])
  const stageX = useTransform(sx, [-0.5, 0.5], [16, -16])
  const stageY = useTransform(sy, [-0.5, 0.5], [10, -10])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.35])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

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

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden bg-hm-muted"
    >
      <motion.div style={{ opacity: heroFade, scale: heroScale }} className="absolute inset-0">
        <motion.div style={{ x: layerX, y: layerY }} className="absolute inset-[-5%]">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-hm-bg via-hm-bg/78 to-hm-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-hm-bg via-transparent to-hm-bg/35" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Easy gifting · Fast checkout
          </motion.p>

          <p className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-hm-text sm:text-6xl md:text-7xl lg:text-8xl">
            HandMade
          </p>

          <h1 className="mt-5 max-w-md text-balance text-lg font-medium leading-snug text-hm-text sm:text-xl md:text-2xl">
            Find a gift in 3 clicks — beautiful, personal, ready to buy.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-hm-text-muted sm:text-base">
            Choose who it’s for, pick a piece, add to bag or buy now. We handle wrap, note, and
            delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Start shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#bestsellers">
              <Button variant="outline" size="lg">
                See bestsellers
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Free gift wrap', 'Same-day dispatch*', 'Secure pay'].map((label) => (
              <span
                key={label}
                className="rounded-full border border-hm-border bg-hm-elevated/70 px-3 py-1.5 text-[11px] font-medium text-hm-text-muted backdrop-blur"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3D floating product stage */}
        <motion.div
          style={{ x: stageX, y: stageY, perspective: 1200 }}
          className="relative mx-auto hidden h-[420px] w-full max-w-md lg:block"
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hm-accent/25"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-hm-border"
          />

          <FloatingGiftCard
            product={heroProducts[0]}
            delay={0}
            depth={2}
            className="absolute left-8 top-6 z-20"
          />
          <FloatingGiftCard
            product={heroProducts[1]}
            delay={0.12}
            depth={-1}
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          />
          <FloatingGiftCard
            product={heroProducts[2]}
            delay={0.22}
            depth={3}
            className="absolute right-4 top-24 z-30"
          />
        </motion.div>
      </div>

      <motion.a
        href="#shop-paths"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-hm-text-subtle"
      >
        Scroll to shop
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="h-8 w-px bg-hm-accent/60"
        />
      </motion.a>
    </section>
  )
}
