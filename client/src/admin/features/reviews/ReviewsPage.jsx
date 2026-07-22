import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const seed = [
  {
    id: 'rv_1',
    product: 'Walnut Serving Tray',
    customer: 'Ananya Krishnan',
    rating: 5,
    comment: 'Beautiful finish — arrived well packed.',
    status: 'approved',
    updatedAt: '2026-07-18T10:00:00.000Z',
    createdAt: '2026-07-17T10:00:00.000Z',
  },
  {
    id: 'rv_2',
    product: 'Brass Candle Set',
    customer: 'Rahul Mehta',
    rating: 4,
    comment: 'Warm glow, slightly lighter than expected.',
    status: 'pending',
    updatedAt: '2026-07-16T10:00:00.000Z',
    createdAt: '2026-07-16T09:00:00.000Z',
  },
  {
    id: 'rv_3',
    product: 'Corporate Welcome Hamper',
    customer: 'Priya Nair',
    rating: 5,
    comment: 'Perfect for our new hires.',
    status: 'approved',
    updatedAt: '2026-07-12T10:00:00.000Z',
    createdAt: '2026-07-11T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_reviews_v1', seed, 'rv')
const hooks = createModuleHooks('reviews', store)

const defaults = {
  product: '',
  customer: '',
  rating: 5,
  comment: '',
  status: 'pending',
}

const fields = [
  { name: 'product', label: 'Product', required: true },
  { name: 'customer', label: 'Customer', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
  { name: 'comment', label: 'Comment', type: 'textarea' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ getValue }) => <TextCell>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ getValue }) => <TextCell>{getValue()} ★</TextCell>,
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ getValue }) => (
      <span className="line-clamp-1 max-w-[240px] text-admin-text-muted">{getValue()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function ReviewsPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Reviews"
      description="Moderate product reviews before they appear on the storefront."
      addLabel="Add Review"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search reviews…"
      getRowLabel={(row) => row.product}
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' },
        ],
      }}
    />
  )
}
