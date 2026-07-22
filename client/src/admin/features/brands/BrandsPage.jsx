import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const seed = [
  {
    id: 'br_1',
    name: 'HandMade Atelier',
    slug: 'handmade-atelier',
    website: 'https://handmade.example',
    status: 'active',
    productCount: 64,
    updatedAt: '2026-07-11T10:00:00.000Z',
    createdAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: 'br_2',
    name: 'HandMade Corp',
    slug: 'handmade-corp',
    website: 'https://corp.handmade.example',
    status: 'active',
    productCount: 22,
    updatedAt: '2026-07-05T10:00:00.000Z',
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'br_3',
    name: 'Studio Clay',
    slug: 'studio-clay',
    website: '',
    status: 'active',
    productCount: 18,
    updatedAt: '2026-06-18T10:00:00.000Z',
    createdAt: '2026-02-01T10:00:00.000Z',
  },
  {
    id: 'br_4',
    name: 'Brass & Bloom',
    slug: 'brass-bloom',
    website: '',
    status: 'draft',
    productCount: 5,
    updatedAt: '2026-05-02T10:00:00.000Z',
    createdAt: '2026-03-01T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_brands_v1', seed, 'br')
const hooks = createModuleHooks('brands', store)

const defaults = {
  name: '',
  slug: '',
  website: '',
  status: 'active',
  productCount: 0,
}

const fields = [
  { name: 'name', label: 'Brand name', required: true },
  { name: 'slug', label: 'Slug', required: true },
  { name: 'website', label: 'Website' },
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
    header: 'Brand',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.name}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ getValue }) => <TextCell muted>{getValue() || '—'}</TextCell>,
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

export function BrandsPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Brand Management"
      description="Manage artisan and partner brands linked to products."
      addLabel="Add Brand"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search brands…"
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
