import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  featuredCategories,
  howSteps,
  occasions,
  reviews,
  shopPaths,
  bestSellers,
} from '@/storefront/data/home'
import { ProductCard3D } from '@/storefront/components/product/ProductCard3D'
import { Button } from '@/shared/components/ui/Button'

function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-hm-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-hm-text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  )
}

/** Clear purchase entry: who is the gift for? */
export function ShopPaths() {
  return (
    <section id="shop-paths" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Start here"
        title="Who are you gifting?"
        description="Three simple paths — pick one and we’ll guide you to the right gifts."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {shopPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <Link
              to={path.path}
              className="group relative block overflow-hidden rounded-hm-xl border border-hm-border bg-hm-elevated shadow-hm-soft"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={path.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="font-display text-2xl text-hm-text">{path.title}</h3>
                <p className="text-sm text-hm-text-muted">{path.hint}</p>
                <span className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-hm-accent transition group-hover:gap-2.5">
                  {path.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/** Occasion chips — fast filter understanding */
export function OccasionStrip() {
  return (
    <section className="border-y border-hm-border bg-hm-elevated/60 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">
          Shop by occasion
        </p>
        <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-none">
          {occasions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="snap-start"
            >
              <Link
                to={item.path}
                className="flex min-w-[118px] flex-col items-center gap-2 rounded-2xl border border-hm-border bg-hm-bg px-4 py-4 text-center transition hover:-translate-y-1 hover:border-hm-accent hover:shadow-hm-soft"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hm-accent/15 font-display text-sm text-hm-accent">
                  {item.label.charAt(0)}
                </span>
                <span className="text-xs font-semibold text-hm-text">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Easy purchase"
        title="Gift in three steps"
        description="Designed so anyone can order confidently — no confusion, no clutter."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {howSteps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="relative rounded-hm-xl border border-hm-border bg-hm-elevated p-6 shadow-hm-soft"
          >
            <p className="font-display text-4xl text-hm-accent/80">{step.step}</p>
            <h3 className="mt-3 text-lg font-semibold text-hm-text">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-hm-text-muted">{step.text}</p>
            {index < howSteps.length - 1 ? (
              <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-hm-accent/50 md:block" />
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Collections"
        title="Browse by style"
        description="Tap a collection to explore gifts that match your moment."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCategories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={cat.path}
              className="group relative block aspect-[3/4] overflow-hidden rounded-hm-xl"
            >
              <img
                src={cat.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl text-white">{cat.title}</p>
                <p className="mt-1 text-sm text-white/75">{cat.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/90 opacity-0 transition group-hover:opacity-100">
                  Shop now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function BestSellers() {
  return (
    <section id="bestsellers" className="bg-hm-muted/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Ready to buy"
          title="Bestsellers — tap Add or Buy now"
          description="Hover for a 3D preview. Add to bag instantly, or buy in one click."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, index) => (
            <ProductCard3D key={product.id} product={product} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button variant="primary" size="lg">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function CorporateBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-hm-primary/78" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-24 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent-soft">
            Bulk & corporate
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            Need 10+ gifts? Get a quote in minutes
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            Tell us your budget and quantity — we’ll suggest kits and send pricing fast.
          </p>
        </div>
        <Link to="/corporate-gifts">
          <Button variant="accent" size="lg">
            Request a quotation
          </Button>
        </Link>
      </div>
    </section>
  )
}

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading eyebrow="Trusted" title="Loved by givers & receivers" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.blockquote
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="glass rounded-hm-xl p-6 shadow-hm-soft"
          >
            <p className="font-display text-xl leading-snug text-hm-text">“{review.quote}”</p>
            <footer className="mt-6 text-sm text-hm-text-muted">
              <span className="font-medium text-hm-text">{review.name}</span> · {review.place}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}

export function NewsletterBand() {
  return (
    <section className="border-y border-hm-border bg-hm-elevated">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl text-hm-text sm:text-4xl">Get new drops first</h2>
          <p className="mt-2 max-w-md text-sm text-hm-text-muted">
            Festival edits and bestsellers — one calm email a month.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Email address"
            className="h-11 flex-1 rounded-hm-md border border-hm-border bg-hm-bg px-4 text-sm outline-none focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
