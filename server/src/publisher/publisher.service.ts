import axios from 'axios'
import { createQueryBuilder, Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import { Post } from '../queue/post.entity'

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(PublisherService.name)

  async publish(posts: Post[]) {
    posts.forEach(async (item) => {
      const media = item.sourceMeta.media || []

      const formattedMedia = media.map((i) => ({
        type: 'photo',
        media: i.src,
        caption: undefined,
        parse_mode: 'Markdown',
      }))

      formattedMedia[0].caption = item.sourceMeta.text

      const botId = this.configService.get<string>('TELEGRAM_BOT_ID')
      const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')

      try {
        await axios.post(`https://api.telegram.org/${botId}/sendMediaGroup`, {
          chat_id: chatId,
          media: formattedMedia,
        })

        this.logger.log(`sent ${item.id}`)
        this.postsRepository.save({ ...item, sentAt: new Date() })
      } catch (e) {
        this.logger.error(`could not send item ${item.sourceId}`, e)
      }
    })
  }

  @Cron('1 * * * * *', { timeZone: 'Europe/Moscow' })
  async handleCron() {
    this.logger.verbose('Publish start')

    const now = DateTime.local().setZone('Europe/Moscow')

    try {
      const posts = await createQueryBuilder()
        .from(Post, 'post')
        .select('post')
        .leftJoinAndSelect('post.timeslot', 'timeslot')
        .andWhere('post.sentAt IS NULL')
        .andWhere('post.deletedAt IS NULL')
        .andWhere('CAST(post."scheduledOn" AS DATE) = :today::date', {
          today: now.toISODate(),
        })
        .andWhere("timeslot.time = DATE_TRUNC('minute', :from::time)", {
          from: now.toISOTime(),
        })
        .orderBy('post.createdAt')
        .getMany()

      if (posts.length > 0) {
        this.publish(posts)
      } else {
        this.logger.verbose('Nothing to publish')
      }
    } catch (e) {
      this.logger.error('Error while finding posts to publish', e)
    }
  }
}
