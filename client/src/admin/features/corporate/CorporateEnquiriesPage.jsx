import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'
import { formatCurrency } from '@/shared/lib/utils'
import { corporateEnquiriesStore } from '@/admin/features/corporate/corporateEnquiriesStore'

const hooks = createModuleHooks('corporate-enquiries', corporateEnquiriesStore)

const defaults = {
  company: '',
  contact: '',
  email: '',
  phone: '',
  budget: 0,
  employees: 0,
  interest: '',
  message: '',
  source: 'admin',
  status: 'new',
}

const fields = [
  { name: 'company', label: 'Company', required: true },
  { name: 'contact', label: 'Contact person', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'budget', label: 'Budget (INR)', type: 'number' },
  { name: 'employees', label: 'Employees', type: 'number' },
  { name: 'interest', label: 'Interest' },
  { name: 'message', label: 'Message', type: 'textarea' },
  { name: 'source', label: 'Source' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'new', label: 'New' },
      { value: 'open', label: 'Open' },
      { value: 'completed', label: 'Completed' },
      { value: 'rejected', label: 'Rejected' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.company}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.contact}</p>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => <TextCell muted>{getValue() || '—'}</TextCell>,
  },
  {
    accessorKey: 'interest',
    header: 'Interest',
    cell: ({ getValue }) => <TextCell muted>{getValue() || '—'}</TextCell>,
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ getValue }) => <TextCell>{formatCurrency(getValue())}</TextCell>,
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ getValue }) => <TextCell muted>{getValue() || '—'}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function CorporateEnquiriesPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Corporate Enquiries"
      description="Track B2B gifting leads and home-page enquiry form submissions."
      addLabel="Add Enquiry"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search companies or contacts…"
      getRowLabel={(row) => row.company}
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'new', label: 'New' },
          { value: 'open', label: 'Open' },
          { value: 'completed', label: 'Completed' },
          { value: 'rejected', label: 'Rejected' },
        ],
      }}
    />
  )
}
