import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { addGlobalPipe } from './add-global-pipe.options';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  addGlobalPipe(app);
  await app.listen(3000);
}
bootstrap();
