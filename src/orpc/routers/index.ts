import { adminRouter } from './admin.router'
import { authRouter } from './auth.router'
import { commentRouter } from './comment.router'
import { githubRouter } from './github.router'
import { likeRouter } from './like.router'
import { messageRouter } from './message.router'
import { replyRouter } from './reply.router'
import { settingsRouter } from './settings.router'
import { unsubscribeRouter } from './unsubscribe.router'
import { viewRouter } from './view.router'

export const router = {
  github: githubRouter,
  view: viewRouter,
  like: likeRouter,
  comment: commentRouter,
  reply: replyRouter,
  message: messageRouter,
  admin: adminRouter,
  auth: authRouter,
  settings: settingsRouter,
  unsubscribe: unsubscribeRouter,
}
