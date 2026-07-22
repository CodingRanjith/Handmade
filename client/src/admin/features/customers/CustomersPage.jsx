import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'
import { formatCurrency } from '@/shared/lib/utils'
import { Avatar } from '@/shared/components/ui/Avatar'

const seed = [
  {
    id: 'cus_1',
    name: 'Ananya Krishnan',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    orders: 8,
    totalSpent: 24680,
    status: 'active',
    updatedAt: '2026-07-20T10:00:00.000Z',
    createdAt: '2025-11-02T10:00:00.000Z',
  },
  {
    id: 'cus_2',
    name: 'Rahul Mehta',
    email: 'rahul@example.com',
    phone: '+91 98111 22334',
    orders: 3,
    totalSpent: 8120,
    status: 'active',
    updatedAt: '2026-07-18T10:00:00.000Z',
    createdAt: '2026-01-14T10:00:00.000Z',
  },
  {
    id: 'cus_3',
    name: 'Priya Nair',
    email: 'priya@example.com',
    phone: '+91 99001 44556',
    orders: 12,
    totalSpent: 41250,
    status: 'active',
    updatedAt: '2026-07-16T10:00:00.000Z',
    createdAt: '2025-08-20T10:00:00.000Z',
  },
  {
    id: 'cus_4',
    name: 'Vikram Shah',
    email: 'vikram@example.com',
    phone: '+91 97654 88990',
    orders: 1,
    totalSpent: 1650,
    status: 'inactive',
    updatedAt: '2026-07-15T10:00:00.000Z',
    createdAt: '2026-07-15T09:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_customers_v1', seed, 'cus')
const hooks = createModuleHooks('customers', store)

const defaults = {
  name: '',
  email: '',
  phone: '',
  orders: 0,
  totalSpent: 0,
  status: 'active',
}

const fields = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'orders', label: 'Orders', type: 'number' },
  { name: 'totalSpent', label: 'Total spent (INR)', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'name',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.original.name} size="sm" />
        <div>
          <TextCell>{row.original.name}</TextCell>
          <p className="text-xs text-admin-text-muted">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'orders',
    header: 'Orders',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'totalSpent',
    header: 'Spent',
    cell: ({ getValue }) => <TextCell>{formatCurrency(getValue())}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function CustomersPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Customers"
      description="View and manage storefront customer accounts."
      addLabel="Add Customer"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search customers…"
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      }}
    />
  )
}
