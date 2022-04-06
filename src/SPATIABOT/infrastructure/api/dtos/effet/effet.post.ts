import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber,IsEnum} from "class-validator";
import {TypeEffetEnum} from "../../../../domain/enums/type-effet.enum";

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

    @ApiProperty({
        description: 'Type',
        required: true
    })
    @IsEnum(TypeEffetEnum)
    @IsNotEmpty()
    type: string;
}
