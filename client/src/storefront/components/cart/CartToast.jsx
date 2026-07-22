import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/storefront/hooks/useCart'

export function CartToast() {
  const { toast } = useCart()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-hm-border bg-hm-elevated/95 px-4 py-3 shadow-hm-elevated backdrop-blur-xl"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hm-success/15 text-hm-success">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-hm-text">{toast}</p>
            <ShoppingBag className="h-4 w-4 text-hm-accent" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
