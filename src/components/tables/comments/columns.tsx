import type { ColumnDef } from '@tanstack/react-table'
import type { AdminCommentListOutput } from '@/orpc/client'

import { tableFeatures } from '@tanstack/react-table'

import FormattedDateCell from '../formatted-date-cell'

export type Comment = AdminCommentListOutput['comments'][number]

export const commentsTableFeatures = tableFeatures({})

export const columns: Array<ColumnDef<typeof commentsTableFeatures, Comment>> = [
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'body',
    header: 'Body',
  },
  {
    accessorKey: 'parentId',
    header: 'Parent ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <FormattedDateCell date={row.original.createdAt} />,
  },
]
