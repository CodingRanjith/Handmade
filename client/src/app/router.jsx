import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/admin/components/layout'
import { AdminDashboardPage } from '@/admin/pages/DashboardPage'
import { AdminPlaceholderPage } from '@/admin/pages/PlaceholderPage'
import { ProductsPage as AdminProductsPage } from '@/admin/features/products/ProductsPage'
import {
  ProductCreatePage,
  ProductEditPage,
} from '@/admin/features/products/ProductFormPages'
import { CategoriesPage as AdminCategoriesPage } from '@/admin/features/categories/CategoriesPage'
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
import { ProductsPage } from '@/storefront/pages/ProductsPage'
import { ProductDetailsPage } from '@/storefront/pages/ProductDetailsPage'
import {
  CategoriesPage,
  PersonalizedGiftsPage,
  BulkOrdersPage,
} from '@/storefront/pages/ShopPages'
import { CorporateGiftsPage } from '@/storefront/pages/CorporateGiftsPage'
import {
  AboutPage,
  BlogPage,
  BlogPostPage,
  FaqPage,
  ContactPage,
} from '@/storefront/pages/ContentPages'
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  WishlistPage,
  CheckoutPage,
  OrderSuccessPage,
} from '@/storefront/pages/AuthCheckoutPages'
import {
  AccountLayout,
  AccountOverviewPage,
  AccountOrdersPage,
  AccountProfilePage,
  AccountAddressesPage,
  AccountNotificationsPage,
} from '@/storefront/pages/AccountPages'
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

export function AppRouter() {
  const adminModuleRoutes = adminFlatNav.filter(
    (item) => !implementedAdminPaths.has(item.path),
  )

  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="personalized-gifts" element={<PersonalizedGiftsPage />} />
        <Route path="corporate-gifts" element={<CorporateGiftsPage />} />
        <Route path="bulk-orders" element={<BulkOrdersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogPostPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="account" element={<AccountLayout />}>
          <Route index element={<AccountOverviewPage />} />
          <Route path="orders" element={<AccountOrdersPage />} />
          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="addresses" element={<AccountAddressesPage />} />
          <Route path="notifications" element={<AccountNotificationsPage />} />
        </Route>
      </Route>

      <Route path="/design-system" element={<DesignSystemPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<ProductCreatePage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
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
