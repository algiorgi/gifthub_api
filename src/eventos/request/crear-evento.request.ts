import { Expose, Type } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class Participante {
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    @IsEmail()
    email: string
}

export class CrearRequest {

    @Expose({name: 'nombre_evento'})
    @IsNotEmpty({message: 'El nombre del evento es requerido'})
    nombre: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Participante)
    organizador: Participante;

    @ArrayMinSize(1, {message: 'El evento debe contener al menos un participante'})
    @ValidateNested({each: true})
    @Type(() => Participante)
    participantes: Array<Participante>;

    @Expose({name: 'monto_maximo'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El monto máximo debe ser un número con dos decimales'})
    @IsPositive({message: 'El monto máximo debe ser un número mayor a cero'})
    montoMaximo: number;
}
