import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const seed = [
  {
    id: 'cat_1',
    name: 'Home Décor',
    slug: 'home-decor',
    description: 'Handcrafted pieces for living spaces',
    sortOrder: 1,
    status: 'active',
    productCount: 48,
    updatedAt: '2026-07-10T10:00:00.000Z',
    createdAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'cat_2',
    name: 'Corporate Gifts',
    slug: 'corporate-gifts',
    description: 'Premium gifting for teams and clients',
    sortOrder: 2,
    status: 'active',
    productCount: 32,
    updatedAt: '2026-07-08T10:00:00.000Z',
    createdAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'cat_3',
    name: 'Personalized Gifts',
    slug: 'personalized-gifts',
    description: 'Custom monograms and keepsakes',
    sortOrder: 3,
    status: 'active',
    productCount: 27,
    updatedAt: '2026-06-20T10:00:00.000Z',
    createdAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'cat_4',
    name: 'Jewellery',
    slug: 'jewellery',
    description: 'Artisan jewellery and accessories',
    sortOrder: 4,
    status: 'draft',
    productCount: 12,
    updatedAt: '2026-05-14T10:00:00.000Z',
    createdAt: '2026-02-01T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_categories_v1', seed, 'cat')
const hooks = createModuleHooks('categories', store)

const defaults = {
  name: '',
  slug: '',
  description: '',
  sortOrder: 0,
  status: 'active',
  productCount: 0,
}

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'slug', label: 'Slug', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'draft', label: 'Draft' },
      { value: 'archived', label: 'Archived' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'name',
    header: 'Category',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.name}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'productCount',
    header: 'Products',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'sortOrder',
    header: 'Order',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function CategoriesPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Category Management"
      description="Organize the HandMade catalog into shoppable categories."
      addLabel="Add Category"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search categories…"
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'draft', label: 'Draft' },
          { value: 'archived', label: 'Archived' },
        ],
      }}
    />
  )
}
