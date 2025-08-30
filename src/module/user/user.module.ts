import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity'
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { OtpEntity } from './entities/otp.entity';

@Module({
  imports :[TypeOrmModule.forFeature([UserEntity , OtpEntity])] ,
  controllers: [UserController],
  providers: [UserService , AuthService , JwtService],
})
export class UserModule {}
