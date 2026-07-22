import { createLocalStore } from '@/admin/lib/createLocalStore'
import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'
import { cn } from '@/shared/utils/cn'

const seed = [
  {
    id: 'inv_1',
    sku: 'WD-204',
    productName: 'Walnut Serving Tray',
    warehouse: 'Chennai Main',
    stock: 42,
    reserved: 4,
    lowStockAt: 10,
    status: 'active',
    updatedAt: '2026-07-18T10:00:00.000Z',
    createdAt: '2026-03-12T10:00:00.000Z',
  },
  {
    id: 'inv_2',
    sku: 'BC-091',
    productName: 'Brass Candle Set',
    warehouse: 'Chennai Main',
    stock: 3,
    reserved: 1,
    lowStockAt: 8,
    status: 'low',
    updatedAt: '2026-07-17T10:00:00.000Z',
    createdAt: '2026-02-20T10:00:00.000Z',
  },
  {
    id: 'inv_3',
    sku: 'CM-077',
    productName: 'Handwoven Ceramic Mug',
    warehouse: 'Bengaluru Hub',
    stock: 0,
    reserved: 0,
    lowStockAt: 15,
    status: 'out_of_stock',
    updatedAt: '2026-07-15T10:00:00.000Z',
    createdAt: '2026-05-14T10:00:00.000Z',
  },
  {
    id: 'inv_4',
    sku: 'CH-501',
    productName: 'Corporate Welcome Hamper',
    warehouse: 'Chennai Main',
    stock: 28,
    reserved: 6,
    lowStockAt: 12,
    status: 'active',
    updatedAt: '2026-07-14T10:00:00.000Z',
    createdAt: '2026-04-02T10:00:00.000Z',
  },
]

const store = createLocalStore('hm_admin_inventory_v1', seed, 'inv')
const hooks = createModuleHooks('inventory', store)

const defaults = {
  sku: '',
  productName: '',
  warehouse: 'Chennai Main',
  stock: 0,
  reserved: 0,
  lowStockAt: 10,
  status: 'active',
}

const fields = [
  { name: 'sku', label: 'SKU', required: true },
  { name: 'productName', label: 'Product', required: true },
  {
    name: 'warehouse',
    label: 'Warehouse',
    type: 'select',
    options: [
      { value: 'Chennai Main', label: 'Chennai Main' },
      { value: 'Bengaluru Hub', label: 'Bengaluru Hub' },
      { value: 'Mumbai Store', label: 'Mumbai Store' },
    ],
  },
  { name: 'stock', label: 'Stock', type: 'number', required: true },
  { name: 'reserved', label: 'Reserved', type: 'number' },
  { name: 'lowStockAt', label: 'Low stock at', type: 'number' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'low', label: 'Low' },
      { value: 'out_of_stock', label: 'Out of stock' },
    ],
  },
]

const columns = [
  {
    accessorKey: 'productName',
    header: 'Product',
    cell: ({ row }) => (
      <div>
        <TextCell>{row.original.productName}</TextCell>
        <p className="text-xs text-admin-text-muted">{row.original.sku}</p>
      </div>
    ),
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'stock',
    header: 'Available',
    cell: ({ row }) => {
      const available = row.original.stock - row.original.reserved
      const low = row.original.stock <= row.original.lowStockAt
      return (
        <span className={cn('font-medium', low ? 'text-admin-danger' : 'text-admin-text')}>
          {available} / {row.original.stock}
        </span>
      )
    },
  },
  {
    accessorKey: 'reserved',
    header: 'Reserved',
    cell: ({ getValue }) => <TextCell muted>{getValue()}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge value={getValue()} />,
  },
]

export function InventoryPage() {
  const { data = [], isLoading } = hooks.useList()
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const deleteMutation = hooks.useRemove()

  return (
    <AdminCrudPage
      title="Inventory"
      description="Track stock levels across warehouses and flag low inventory."
      addLabel="Add Stock Row"
      data={data}
      isLoading={isLoading}
      createMutation={createMutation}
      updateMutation={updateMutation}
      deleteMutation={deleteMutation}
      columns={columns}
      fields={fields}
      defaults={defaults}
      searchPlaceholder="Search by product or SKU…"
      getRowLabel={(row) => row.productName}
      statusFilter={{
        key: 'status',
        label: 'All statuses',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'low', label: 'Low' },
          { value: 'out_of_stock', label: 'Out of stock' },
        ],
      }}
    />
  )
}
