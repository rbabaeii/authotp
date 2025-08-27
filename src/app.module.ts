import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModules } from './module/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './config/typeorm.config';

@Module({
  imports: [CustomConfigModules ,
    TypeOrmModule.forRootAsync({
      useClass  : TypeormConfig ,
      inject : [TypeormConfig],

    })
  ],
  controllers: [AppController],
  providers: [AppService , TypeormConfig],
})
export class AppModule {}
