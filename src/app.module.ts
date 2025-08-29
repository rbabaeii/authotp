import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModules } from './module/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './config/typeorm.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CustomConfigModules ,
    TypeOrmModule.forRootAsync({
      useClass  : TypeormConfig ,
      inject : [TypeormConfig],

    }) , UserModule, AuthModule ,  JwtModule 
  ],
  controllers: [AppController],
  providers: [AppService , TypeormConfig],
})
export class AppModule {}
