import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=2000&q=80'

/** Clean hero — brand-first, no 3D / parallax clutter */
export function HeroBanner() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-hm-muted">
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hm-bg via-hm-bg/80 to-hm-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-hm-bg via-transparent to-hm-bg/25" />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Curated gifting
          </p>
          <p className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-hm-text sm:text-6xl md:text-7xl lg:text-8xl">
            HandMade
          </p>
          <h1 className="mt-5 max-w-md text-balance text-lg font-medium leading-snug text-hm-text sm:text-xl md:text-2xl">
            Beautiful gifts, ready to personalize and buy.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-hm-text-muted sm:text-base">
            Personalized keepsakes, corporate kits, and home pieces — packed with care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Shop gifts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/corporate-gifts">
              <Button variant="outline" size="lg">
                Corporate gifting
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
