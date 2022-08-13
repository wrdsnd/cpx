import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { randomBytes } from 'crypto'
import { Response } from 'express'
import { AuthGuard } from 'src/guards'
import { Repository } from 'typeorm'
import { LoginInput, LoginResult, LogoutResult } from '../graphql'
import { Session } from './session.entity'
import { User } from './user.entity'

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  @Mutation()
  async login(
    @Context() context: GraphQLExecutionContext,
    @Args('input') input: LoginInput,
  ): Promise<LoginResult> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
    })
    const result = await compare(input.password, user.hash)

    const session = new Session()
    session.user = user
    session.sessionId = randomBytes(32).toString('hex')
    session.active = true
    await this.sessionRepository.insert(session)

    const response = (context as any).res as Response
    response.cookie('session', session.sessionId, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    })

    return {
      result,
    }
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async logout(): Promise<LogoutResult> {
    return {
      result: true,
    }
  }
}
