import { Body, Controller, Post } from '@nestjs/common';
import { EventoCreadoResponse } from './dto/evento-creado.dto';
import { CrearRequest as CrearEventoRequest } from './request/crear-evento.request';

@Controller('eventos')
export class ControladorDeEventos { 

    @Post()
    crear(@Body() request: CrearEventoRequest): EventoCreadoResponse {
        return {id: '1'};
    }
}