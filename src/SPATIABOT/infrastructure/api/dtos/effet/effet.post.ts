import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";

export class EffetPost implements EffetInterface {

    @ApiProperty({
        description: 'Quantite',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    quantite: number;

    @ApiProperty({
        description: 'Etape',
        required: true
    })
    @IsNotEmpty()
    etape: {id : string};


    @ApiProperty({
        description: 'Unité',
        required: true
    })
    @IsNotEmpty()
    unite: {id : string};
}
