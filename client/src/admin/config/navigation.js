import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Building2,
  FileText,
  Gift,
  Star,
  Ticket,
  Image,
  Images,
  Newspaper,
  PanelsTopLeft,
  Bell,
  BarChart3,
  LineChart,
  Settings,
  Shield,
  ScrollText,
} from 'lucide-react'

/**
 * Admin sidebar navigation — grouped for enterprise scale.
 * path values map to React Router routes under /admin.
 */
export const adminNavigation = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    id: 'catalog',
    label: 'Catalog',
    items: [
      {
        id: 'products',
        label: 'Product Management',
        path: '/admin/products',
        icon: Package,
      },
      {
        id: 'categories',
        label: 'Category Management',
        path: '/admin/categories',
        icon: Layers,
      },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    items: [
      {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: ShoppingCart,
      },
      {
        id: 'customers',
        label: 'Customers',
        path: '/admin/customers',
        icon: Users,
      },
      {
        id: 'corporate',
        label: 'Corporate Enquiries',
        path: '/admin/corporate-enquiries',
        icon: Building2,
      },
      {
        id: 'quotations',
        label: 'Quotation Management',
        path: '/admin/quotations',
        icon: FileText,
      },
      {
        id: 'personalized',
        label: 'Personalized Orders',
        path: '/admin/personalized-orders',
        icon: Gift,
      },
      {
        id: 'reviews',
        label: 'Reviews',
        path: '/admin/reviews',
        icon: Star,
      },
      {
        id: 'coupons',
        label: 'Coupons',
        path: '/admin/coupons',
        icon: Ticket,
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      {
        id: 'banners',
        label: 'Banner Management',
        path: '/admin/banners',
        icon: Image,
      },
      {
        id: 'media',
        label: 'Media Library',
        path: '/admin/media',
        icon: Images,
      },
      {
        id: 'blog',
        label: 'Blog',
        path: '/admin/blog',
        icon: Newspaper,
      },
      {
        id: 'cms',
        label: 'CMS',
        path: '/admin/cms',
        icon: PanelsTopLeft,
      },
      {
        id: 'notifications',
        label: 'Notifications',
        path: '/admin/notifications',
        icon: Bell,
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        path: '/admin/reports',
        icon: BarChart3,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        path: '/admin/analytics',
        icon: LineChart,
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        path: '/admin/settings',
        icon: Settings,
      },
      {
        id: 'roles',
        label: 'Role Management',
        path: '/admin/roles',
        icon: Shield,
      },
      {
        id: 'audit',
        label: 'Audit Logs',
        path: '/admin/audit-logs',
        icon: ScrollText,
      },
    ],
  },
]

export const adminFlatNav = adminNavigation.flatMap((group) => group.items)

/** @deprecated Prefer adminNavigation — alias for Step 1 compatibility */
export const adminNavGroups = adminNavigation
