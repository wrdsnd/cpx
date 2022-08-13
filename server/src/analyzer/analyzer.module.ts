import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TwitterModule } from '../twitter/twitter.module'
import { TwitterService } from '../twitter/twitter.service'
import { AnalyzeResolver } from './analyze.resolver'

@Module({
  imports: [TwitterModule, ConfigModule],
  providers: [AnalyzeResolver, TwitterService],
})
export class AnalyzerModule {}
