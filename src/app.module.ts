import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuloDeEventos } from './eventos/eventos.module';

@Module({
  imports: [ModuloDeEventos],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
