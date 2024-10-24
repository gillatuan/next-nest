import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // set port
  const port = configService.get('PORT');
  
  // set validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  // set prefix
  app.setGlobalPrefix('api/v1', { exclude: [""]})

  await app.listen(port);
}
bootstrap();
