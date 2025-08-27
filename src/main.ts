import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configServise = app.get(ConfigService)
  const port = configServise.get("App.port")
  await app.listen(port , ()=>{
    console.log(`server run on port ${port}`);
  });
}
bootstrap();
