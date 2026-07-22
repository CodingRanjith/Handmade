import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/admin/components/layout'
import { AdminDashboardPage } from '@/admin/pages/DashboardPage'
import { AdminPlaceholderPage } from '@/admin/pages/PlaceholderPage'
import { ProductsPage } from '@/admin/features/products/ProductsPage'
import {
  ProductCreatePage,
  ProductEditPage,
} from '@/admin/features/products/ProductFormPages'
import { CategoriesPage } from '@/admin/features/categories/CategoriesPage'
import { SubcategoriesPage } from '@/admin/features/subcategories/SubcategoriesPage'
import { BrandsPage } from '@/admin/features/brands/BrandsPage'
import { InventoryPage } from '@/admin/features/inventory/InventoryPage'
import { OrdersPage } from '@/admin/features/orders/OrdersPage'
import { CustomersPage } from '@/admin/features/customers/CustomersPage'
import { CorporateEnquiriesPage } from '@/admin/features/corporate/CorporateEnquiriesPage'
import { QuotationsPage } from '@/admin/features/quotations/QuotationsPage'
import { PersonalizedOrdersPage } from '@/admin/features/personalized/PersonalizedOrdersPage'
import { ReviewsPage } from '@/admin/features/reviews/ReviewsPage'
import { CouponsPage } from '@/admin/features/coupons/CouponsPage'
import { BannersPage } from '@/admin/features/banners/BannersPage'
import { MediaPage } from '@/admin/features/media/MediaPage'
import { CmsPage } from '@/admin/features/cms/CmsPage'
import { NotificationsPage } from '@/admin/features/notifications/NotificationsPage'
import { ReportsPage } from '@/admin/features/reports/ReportsPage'
import { AnalyticsPage } from '@/admin/features/analytics/AnalyticsPage'
import { SettingsPage } from '@/admin/features/settings/SettingsPage'
import { RolesPage } from '@/admin/features/roles/RolesPage'
import { AuditLogsPage } from '@/admin/features/audit/AuditLogsPage'
import { DesignSystemPage } from '@/storefront/pages/DesignSystemPage'
import { HomePage } from '@/storefront/pages/HomePage'
import { CartPage } from '@/storefront/pages/CartPage'
import { StorefrontLayout } from '@/storefront/layouts/StorefrontLayout'
import { adminFlatNav } from '@/admin/config/navigation'

const implementedAdminPaths = new Set([
  '/admin',
  '/admin/products',
  '/admin/categories',
  '/admin/subcategories',
  '/admin/brands',
  '/admin/inventory',
  '/admin/orders',
  '/admin/customers',
  '/admin/corporate-enquiries',
  '/admin/quotations',
  '/admin/personalized-orders',
  '/admin/reviews',
  '/admin/coupons',
  '/admin/banners',
  '/admin/media',
  '/admin/cms',
  '/admin/notifications',
  '/admin/reports',
  '/admin/analytics',
  '/admin/settings',
  '/admin/roles',
  '/admin/audit-logs',
])

function StorefrontPlaceholder({ title }) {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent">Coming soon</p>
      <h1 className="mt-3 font-display text-4xl text-hm-text sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-hm-text-muted">
        This page will be built in a later storefront module.
      </p>
    </div>
  )
}

export function AppRouter() {
  const adminModuleRoutes = adminFlatNav.filter(
    (item) => !implementedAdminPaths.has(item.path),
  )

  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<StorefrontPlaceholder title="Checkout" />} />
        <Route path="products" element={<StorefrontPlaceholder title="Products" />} />
        <Route path="products/:id" element={<StorefrontPlaceholder title="Product details" />} />
        <Route path="categories" element={<StorefrontPlaceholder title="Categories" />} />
        <Route path="personalized-gifts" element={<StorefrontPlaceholder title="Personalized Gifts" />} />
        <Route path="corporate-gifts" element={<StorefrontPlaceholder title="Corporate Gifts" />} />
        <Route path="about" element={<StorefrontPlaceholder title="About" />} />
        <Route path="blog" element={<StorefrontPlaceholder title="Blog" />} />
        <Route path="contact" element={<StorefrontPlaceholder title="Contact" />} />
        <Route path="faq" element={<StorefrontPlaceholder title="FAQ" />} />
      </Route>

      <Route path="/design-system" element={<DesignSystemPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<ProductCreatePage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="subcategories" element={<SubcategoriesPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="corporate-enquiries" element={<CorporateEnquiriesPage />} />
        <Route path="quotations" element={<QuotationsPage />} />
        <Route path="personalized-orders" element={<PersonalizedOrdersPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="banners" element={<BannersPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="cms" element={<CmsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        {adminModuleRoutes.map((item) => (
          <Route
            key={item.id}
            path={item.path.replace(/^\/admin\//, '')}
            element={<AdminPlaceholderPage title={item.label} />}
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
