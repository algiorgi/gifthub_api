import { Controller, Post } from '@nestjs/common';
import { EventoCreadoResponse } from './dto/evento-creado.dto';

@Controller('eventos')
export class ControladorDeEventos { 

    @Post()
    crear(): EventoCreadoResponse {
        return {id: '1'};
    }
}