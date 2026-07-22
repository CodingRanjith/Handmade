import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'
import { formatCurrency } from '@/shared/lib/utils'

const seed = [
  {
    id: 'ce_1',
    company: 'NovaTech Pvt Ltd',
    contact: 'Sneha Iyer',
    email: 'sneha@novatech.example',
    budget: 150000,
    employees: 120,
    message: 'Diwali gifting for all employees — prefer sustainable packaging.',
    status: 'new',
    updatedAt: '2026-07-21T10:00:00.000Z',
    createdAt: '2026-07-21T09:00:00.000Z',
  },
  {
    id: 'ce_2',
    company: 'Cedar Bank',
    contact: 'Arjun Kapoor',
    email: 'arjun@cedarbank.example',
    budget: 420000,
    employees: 350,
    message: 'Client appreciation hampers for Q3.',
    status: 'open',
    updatedAt: '2026-07-18T10:00:00.000Z',
    createdAt: '2026-07-17T10:00:00.000Z',
  },
  {
    id: 'ce_3',
    company: 'Bloom Studios',
    contact: 'Meera Das',
    email: 'meera@bloom.example',
    budget: 85000,
    employees: 40,
    message: 'Onboarding kits with branded notebooks.',
    status: 'completed',
    updatedAt: '2026-07-10T10:00:00.000Z',
    createdAt: '2026-07-01T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_corporate_v1', seed, 'ce')
const hooks = createModuleHooks('corporate-enquiries', store)

const defaults = {
  company: '',
  contact: '',
  email: '',
  budget: 0,
  employees: 0,
  message: '',
  status: 'new',
}

const fields = [
  { name: 'company', label: 'Company', required: true },
  { name: 'contact', label: 'Contact person', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'budget', label: 'Budget (INR)', type: 'number' },
  { name: 'employees', label: 'Employees', type: 'number' },
  { name: 'message', label: 'Message', type: 'textarea' },
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
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ getValue }) => <TextCell>{formatCurrency(getValue())}</TextCell>,
  },
  {
    accessorKey: 'employees',
    header: 'Headcount',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
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
      description="Track B2B gifting leads and follow-ups."
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
