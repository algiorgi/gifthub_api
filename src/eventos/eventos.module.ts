import { Module } from '@nestjs/common';
import { ControladorDeEventos } from './eventos.controller';

@Module({
    controllers: [ControladorDeEventos]
})

export class ModuloDeEventos {}