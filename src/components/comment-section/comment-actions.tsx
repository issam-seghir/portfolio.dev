import NumberFlow from '@number-flow/react'
import { ChevronDownIcon, MessageSquareIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useCommentContext } from '@/contexts/comment.context'
import { useCommentsContext } from '@/contexts/comments.context'

function CommentActions() {
  useCommentsContext()
  const { comment, setIsReplying, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const t = useTranslations()

  const hasReplies = !comment.parentId && comment.replyCount > 0

  return (
    <>
      <div className='flex gap-1'>
        {comment.parentId ? null : (
          <Button
            variant='secondary'
            size='sm'
            className='text-xs text-muted-foreground'
            onClick={() => {
              setIsReplying(true)
            }}
            data-testid='comment-reply-button'
          >
            <MessageSquareIcon />
            {t('blog.comments.reply')}
          </Button>
        )}
      </div>
      {hasReplies && (
        <Button
          variant='ghost'
          size='sm'
          className='mt-4 text-xs data-open:[&>svg]:rotate-180'
          onClick={() => {
            setIsOpenReplies(!isOpenReplies)
          }}
          data-state={isOpenReplies ? 'open' : 'closed'}
          data-testid='comment-replies-expand-button'
        >
          <ChevronDownIcon data-icon='inline-start' className='size-4 transition-transform duration-200' />
          <NumberFlow value={comment.replyCount} data-testid='comment-reply-count' />
          {t('blog.comments.replies', { count: comment.replyCount })}
        </Button>
      )}
    </>
  )
}

export default CommentActions
