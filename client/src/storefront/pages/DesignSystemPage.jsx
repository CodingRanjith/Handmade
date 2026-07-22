import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Moon, Sun } from 'lucide-react'
import { Button, Skeleton } from '@/shared/components/ui'
import { useTheme } from '@/shared/hooks/useTheme'

/**
 * Temporary design-system preview until Home page is built.
 */
export function DesignSystemPage() {
  const { toggleTheme, isDark, theme } = useTheme()

  return (
    <div className="relative min-h-svh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-hm-accent/20 blur-[120px]" />
        <div className="absolute -right-16 bottom-0 h-[380px] w-[380px] rounded-full bg-hm-primary/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="font-display text-3xl tracking-tight text-hm-text">HandMade</p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-hm-text-subtle">
            Design System · Step 1
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Admin ERP
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-10 px-6 pb-20 pt-4">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-hm-2xl p-8 shadow-hm-card sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent">
            Foundation
          </p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-[1.1] tracking-tight text-hm-text sm:text-5xl md:text-6xl">
            Luxury tokens for a handmade gifting brand
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-hm-text-muted sm:text-lg">
            Brown, cream, ivory, and gold — with glass surfaces, soft depth, and calm motion.
            Theme is currently <span className="font-medium text-hm-text">{theme}</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </motion.section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-hm-xl border border-hm-border bg-hm-surface-solid p-6 shadow-hm-soft">
            <h2 className="font-display text-2xl text-hm-text">Color Palette</h2>
            <div className="mt-5 grid grid-cols-5 gap-3">
              {[
                { name: 'BG', className: 'bg-hm-bg border border-hm-border' },
                { name: 'Muted', className: 'bg-hm-bg-muted' },
                { name: 'Primary', className: 'bg-hm-primary' },
                { name: 'Accent', className: 'bg-hm-accent' },
                { name: 'Soft', className: 'bg-hm-accent-soft' },
              ].map((swatch) => (
                <div key={swatch.name} className="text-center">
                  <div className={`aspect-square rounded-hm-md ${swatch.className}`} />
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-hm-text-subtle">
                    {swatch.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-hm-xl border border-hm-border bg-hm-surface-solid p-6 shadow-hm-soft">
            <h2 className="font-display text-2xl text-hm-text">Typography</h2>
            <p className="mt-4 font-display text-4xl text-hm-text">Cormorant Garamond</p>
            <p className="mt-2 text-sm text-hm-text-muted">
              Outfit — body and UI at 14–16px with relaxed tracking.
            </p>
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-24 w-full rounded-hm-lg" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="glass rounded-hm-xl p-5 shadow-hm-card"
            >
              <div className="aspect-[4/3] rounded-hm-lg bg-gradient-to-br from-hm-bg-muted to-hm-accent-muted" />
              <p className="mt-4 font-display text-xl text-hm-text">Premium Card {i}</p>
              <p className="mt-1 text-sm text-hm-text-muted">Glass · shadow · hover lift</p>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  )
}
