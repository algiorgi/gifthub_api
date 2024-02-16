import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CrearRequest {
    @Expose({name: 'nombre_evento'})
    @IsNotEmpty()
    nombre: string
}