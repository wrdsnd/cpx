import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from '../auth/session.entity'
import { Post } from '../queue/post.entity'
import { DraftsResolver } from './drafts.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Session])],
  providers: [DraftsResolver],
})
export class DraftsModule {}
