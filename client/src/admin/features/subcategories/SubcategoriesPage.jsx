import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const seed = [
  {
    id: 'sub_1',
    name: 'Serveware',
    slug: 'serveware',
    category: 'Home Décor',
    status: 'active',
    productCount: 14,
    updatedAt: '2026-07-12T10:00:00.000Z',
    createdAt: '2026-01-05T10:00:00.000Z',
  },
  {
    id: 'sub_2',
    name: 'Lighting',
    slug: 'lighting',
    category: 'Home Décor',
    status: 'active',
    productCount: 9,
    updatedAt: '2026-07-01T10:00:00.000Z',
    createdAt: '2026-01-05T10:00:00.000Z',
  },
  {
    id: 'sub_3',
    name: 'Hampers',
    slug: 'hampers',
    category: 'Corporate Gifts',
    status: 'active',
    productCount: 11,
    updatedAt: '2026-06-28T10:00:00.000Z',
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'sub_4',
    name: 'Wrapping',
    slug: 'wrapping',
    category: 'Personalized Gifts',
    status: 'draft',
    productCount: 6,
    updatedAt: '2026-05-20T10:00:00.000Z',
    createdAt: '2026-02-12T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_subcategories_v1', seed, 'sub')
const hooks = createModuleHooks('subcategories', store)

const defaults = {
  name: '',
  slug: '',
  category: 'Home Décor',
  status: 'active',
  productCount: 0,
}

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'slug', label: 'Slug', required: true },
  {
    name: 'category',
    label: 'Parent category',
    type: 'select',
    options: [
      { value: 'Home Décor', label: 'Home Décor' },
      { value: 'Corporate Gifts', label: 'Corporate Gifts' },
      { value: 'Personalized Gifts', label: 'Personalized Gifts' },
      { value: 'Jewellery', label: 'Jewellery' },
    ],
  },
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
    header: 'Subcategory',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.name}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'productCount',
    header: 'Products',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function SubcategoriesPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Sub Category"
      description="Nest products under parent categories for clearer browsing."
      addLabel="Add Subcategory"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search subcategories…"
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
