import { createModuleHooks } from '@/admin/lib/createModuleHooks'
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} from '@/admin/features/categories/categoryStore'
import { AdminCrudPage, StatusBadge, TextCell } from '@/admin/components/crud/AdminCrudPage'

const store = {
  list: listCategories,
  getById: getCategoryById,
  create: createCategory,
  update: updateCategory,
  remove: deleteCategory,
}

const hooks = createModuleHooks('categories', store)

const defaults = {
  name: '',
  slug: '',
  description: '',
  sortOrder: 0,
  status: 'active',
  productCount: 0,
  imageUrl: '',
}

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'slug', label: 'Slug', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'imageUrl', label: 'Image URL' },
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
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-lg bg-admin-muted">
          {row.original.imageUrl ? (
            <img
              src={row.original.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
        <div>
          <TextCell>{row.original.name}</TextCell>
          <p className="text-xs text-admin-text-muted">{row.original.slug}</p>
        </div>
      </div>
    ),
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
      description="Categories created here appear on the customer Categories page."
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
