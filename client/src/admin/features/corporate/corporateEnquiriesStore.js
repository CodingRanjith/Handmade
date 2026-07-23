import { createLocalStore } from '@/admin/lib/createLocalStore'

const seed = [
  {
    id: 'ce_1',
    company: 'NovaTech Pvt Ltd',
    contact: 'Sneha Iyer',
    email: 'sneha@novatech.example',
    phone: '',
    budget: 150000,
    employees: 120,
    interest: 'Corporate',
    message: 'Diwali gifting for all employees — prefer sustainable packaging.',
    source: 'admin',
    status: 'new',
    updatedAt: '2026-07-21T10:00:00.000Z',
    createdAt: '2026-07-21T09:00:00.000Z',
  },
  {
    id: 'ce_2',
    company: 'Cedar Bank',
    contact: 'Arjun Kapoor',
    email: 'arjun@cedarbank.example',
    phone: '',
    budget: 420000,
    employees: 350,
    interest: 'Corporate',
    message: 'Client appreciation hampers for Q3.',
    source: 'admin',
    status: 'open',
    updatedAt: '2026-07-18T10:00:00.000Z',
    createdAt: '2026-07-17T10:00:00.000Z',
  },
  {
    id: 'ce_3',
    company: 'Bloom Studios',
    contact: 'Meera Das',
    email: 'meera@bloom.example',
    phone: '',
    budget: 85000,
    employees: 40,
    interest: 'Corporate',
    message: 'Onboarding kits with branded notebooks.',
    source: 'admin',
    status: 'completed',
    updatedAt: '2026-07-10T10:00:00.000Z',
    createdAt: '2026-07-01T10:00:00.000Z',
  },
]

export const corporateEnquiriesStore = createLocalStore('hm_admin_corporate_v1', seed, 'ce')

export function listCorporateEnquiries() {
  return corporateEnquiriesStore.list()
}

export function createCorporateEnquiry(payload) {
  return corporateEnquiriesStore.create({
    company: payload.company || 'Website enquiry',
    contact: payload.contact || '',
    email: payload.email || '',
    phone: payload.phone || '',
    budget: Number(payload.budget) || 0,
    employees: Number(payload.employees) || 0,
    interest: payload.interest || '',
    message: payload.message || '',
    source: payload.source || 'website',
    status: payload.status || 'new',
  })
}
