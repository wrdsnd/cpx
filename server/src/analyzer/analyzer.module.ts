import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TwitterModule } from 'src/twitter/twitter.module'
import { TwitterService } from 'src/twitter/twitter.service'
import { Post } from '../queue/post.entity'
import { AnalyzeResolver } from './analyze.resolver'

@Module({
  imports: [TwitterModule, ConfigModule, TypeOrmModule.forFeature([Post])],
  providers: [AnalyzeResolver, TwitterService],
})
export class AnalyzerModule {}
