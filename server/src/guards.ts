import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'
import { Session } from './auth/session.entity'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req as Request
    const sessionId = request.cookies['session']

    if (!sessionId) {
      throw new UnauthorizedException()
    }

    const session = await this.sessionsRepository.findOne({
      where: { sessionId },
    })
    if (session) {
      return true
    }

    throw new UnauthorizedException()
  }
}
