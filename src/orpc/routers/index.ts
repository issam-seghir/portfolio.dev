import { adminRouter } from './admin.router'
import { authRouter } from './auth.router'
import { briefRouter } from './brief.router'
import { commentRouter } from './comment.router'
import { githubRouter } from './github.router'
import { likeRouter } from './like.router'
import { messageRouter } from './message.router'
import { r2Router } from './r2.router'
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
  r2: r2Router,
  brief: briefRouter,
}
