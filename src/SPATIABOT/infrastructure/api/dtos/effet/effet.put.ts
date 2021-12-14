import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {TypeEffetEnum} from "../../../../domain/enums/type-effet.enum";

export class EffetPut implements EffetInterface {

    @ApiProperty({
        description: 'Quantite',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    quantite: number;

    @ApiProperty({
        description: 'Unité',
        required: true
    })
    @IsNotEmpty()
    @IsOptional()
    unite: { id: string };

    @ApiProperty({
        description: 'Type',
        required: true
    })
    @IsEnum(TypeEffetEnum)
    @IsNotEmpty()
    @IsOptional()
    type: string;
}
