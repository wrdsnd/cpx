import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthResolver } from './auth.resolver'
import { Session } from './session.entity'
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [AuthResolver],
})
export class AuthModule {}
