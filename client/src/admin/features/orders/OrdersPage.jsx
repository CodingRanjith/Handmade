import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'
import { formatCurrency } from '@/shared/lib/utils'

const seed = [
  {
    id: 'ord_1',
    orderNumber: 'HM-10482',
    customer: 'Ananya Krishnan',
    email: 'ananya@example.com',
    total: 5780,
    items: 2,
    paymentStatus: 'paid',
    status: 'processing',
    updatedAt: '2026-07-20T10:00:00.000Z',
    createdAt: '2026-07-20T08:00:00.000Z',
  },
  {
    id: 'ord_2',
    orderNumber: 'HM-10471',
    customer: 'Rahul Mehta',
    email: 'rahul@example.com',
    total: 2890,
    items: 1,
    paymentStatus: 'paid',
    status: 'shipped',
    updatedAt: '2026-07-19T10:00:00.000Z',
    createdAt: '2026-07-18T10:00:00.000Z',
  },
  {
    id: 'ord_3',
    orderNumber: 'HM-10455',
    customer: 'Priya Nair',
    email: 'priya@example.com',
    total: 9180,
    items: 3,
    paymentStatus: 'paid',
    status: 'delivered',
    updatedAt: '2026-07-16T10:00:00.000Z',
    createdAt: '2026-07-14T10:00:00.000Z',
  },
  {
    id: 'ord_4',
    orderNumber: 'HM-10440',
    customer: 'Vikram Shah',
    email: 'vikram@example.com',
    total: 1650,
    items: 1,
    paymentStatus: 'pending',
    status: 'pending',
    updatedAt: '2026-07-15T10:00:00.000Z',
    createdAt: '2026-07-15T09:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_orders_v1', seed, 'ord')
const hooks = createModuleHooks('orders', store)

const defaults = {
  orderNumber: '',
  customer: '',
  email: '',
  total: 0,
  items: 1,
  paymentStatus: 'pending',
  status: 'pending',
}

const fields = [
  { name: 'orderNumber', label: 'Order number', required: true },
  { name: 'customer', label: 'Customer', required: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'total', label: 'Total (INR)', type: 'number', required: true },
  { name: 'items', label: 'Items', type: 'number' },
  {
    name: 'paymentStatus',
    label: 'Payment',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'paid', label: 'Paid' },
      { value: 'failed', label: 'Failed' },
      { value: 'refunded', label: 'Refunded' },
    ],
  },
  {
    name: 'status',
    label: 'Fulfillment',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'orderNumber',
    header: 'Order',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.orderNumber}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.items} items</p>
      </div>
    ),
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.customer}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ getValue }) => <TextCell>{formatCurrency(getValue())}</TextCell>,
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function OrdersPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Orders"
      description="Review and update customer order fulfillment status."
      addLabel="Add Order"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search orders, customers…"
      getRowLabel={(row) => row.orderNumber}
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'processing', label: 'Processing' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      }}
    />
  )
}
