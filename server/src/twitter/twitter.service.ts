import Axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OAuth = require('oauth-1.0a')

@Injectable()
export class TwitterService {
  oauth: any

  constructor(private configService: ConfigService) {
    this.oauth = OAuth({
      consumer: {
        key: this.configService.get<string>('TWITTER_APP_CONSUMER_KEY'),
        secret: this.configService.get<string>('TWITTER_APP_CONSUMER_SECRET'),
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string: string, key: string) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64')
      },
    })
  }

  tweets = (id: string) => {
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json`

    const data = {
      user_id: id,
      exclude_replies: true,
      include_rts: false,
      max_results: 100,
    }

    const request_data = {
      url,
      method: 'GET',
      data,
    }

    return Axios.get(url, {
      params: data,
      headers: this.oauth.toHeader(this.oauth.authorize(request_data)),
    }).then((result) => result.data)
  }

  statuses = (): Promise<any[]> => {
    const url = 'https://api.twitter.com/1.1/lists/statuses.json'

    const data = {
      slug: 'cutepix',
      owner_screen_name: 'endless_cat',
      include_entities: true,
      include_rts: false,
      count: 100,
    }

    const request_data = {
      url,
      method: 'GET',
      data,
    }

    return Axios.get(url, {
      params: data,
      headers: this.oauth.toHeader(this.oauth.authorize(request_data)),
    }).then((result) => result.data)
  }

  show = ({ id }) => {
    const oauthToken = undefined
    const url = 'https://api.twitter.com/1.1/statuses/show.json'

    const data = {
      id,
      include_entities: true,
    }

    const request_data = {
      url,
      method: 'GET',
      data,
    }

    return Axios.get(url, {
      params: data,
      headers: this.oauth.toHeader(
        this.oauth.authorize(request_data, oauthToken),
      ),
    })
  }
}
