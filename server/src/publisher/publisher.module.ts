import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../queue/post.entity'
import { PublisherService } from './publisher.service'

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Post])],
  providers: [PublisherService],
})
export class PublisherModule {}
