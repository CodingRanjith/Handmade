import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const seed = [
  {
    id: 'po_1',
    orderRef: 'PO-2201',
    customer: 'Ananya Krishnan',
    product: 'Gold-Tone Keepsake Box',
    personalization: 'Engrave: A.K. — July 2026',
    status: 'processing',
    updatedAt: '2026-07-19T10:00:00.000Z',
    createdAt: '2026-07-18T10:00:00.000Z',
  },
  {
    id: 'po_2',
    orderRef: 'PO-2194',
    customer: 'Rahul Mehta',
    product: 'Linen Gift Wrap Kit',
    personalization: 'Monogram card: R & S',
    status: 'pending',
    updatedAt: '2026-07-17T10:00:00.000Z',
    createdAt: '2026-07-17T09:00:00.000Z',
  },
  {
    id: 'po_3',
    orderRef: 'PO-2170',
    customer: 'Priya Nair',
    product: 'Walnut Serving Tray',
    personalization: 'Laser etch family crest',
    status: 'completed',
    updatedAt: '2026-07-10T10:00:00.000Z',
    createdAt: '2026-07-05T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_personalized_v1', seed, 'po')
const hooks = createModuleHooks('personalized-orders', store)

const defaults = {
  orderRef: '',
  customer: '',
  product: '',
  personalization: '',
  status: 'pending',
}

const fields = [
  { name: 'orderRef', label: 'Order ref', required: true },
  { name: 'customer', label: 'Customer', required: true },
  { name: 'product', label: 'Product', required: true },
  { name: 'personalization', label: 'Personalization', type: 'textarea', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'orderRef',
    header: 'Ref',
    cell: ({ getValue }) => <TextCell>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'personalization',
    header: 'Details',
    cell: ({ getValue }) => (
      <span className="line-clamp-1 max-w-[220px] text-admin-text-muted">{getValue()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function PersonalizedOrdersPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Personalized Orders"
      description="Manage custom engraving and monogram requests."
      addLabel="Add Order"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search personalized orders…"
      getRowLabel={(row) => row.orderRef}
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'processing', label: 'Processing' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      }}
    />
  )
}
