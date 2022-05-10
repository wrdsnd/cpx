import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../queue/post.entity'
import { DraftsResolver } from './drafts.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [DraftsResolver],
})
export class DraftsModule {}
