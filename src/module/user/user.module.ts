import { Module } from '@nestjs/common';
import { Service } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity'

@Module({
  imports :[TypeOrmModule.forFeature([UserEntity])] ,
  controllers: [UserController],
  providers: [Service],
})
export class UserModule {}
