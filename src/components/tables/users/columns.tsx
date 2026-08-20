import type { ColumnDef } from '@tanstack/react-table'
import type { AdminUserListOutput } from '@/orpc/client'

import { tableFeatures } from '@tanstack/react-table'

import FormattedDateCell from '../formatted-date-cell'

export type User = AdminUserListOutput['users'][number]

export const usersTableFeatures = tableFeatures({})

export const columns: Array<ColumnDef<typeof usersTableFeatures, User>> = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <FormattedDateCell date={row.original.createdAt} />,
  },
]
