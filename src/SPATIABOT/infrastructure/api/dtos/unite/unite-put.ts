import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";

export class UnitePut implements UniteInterface {

    @ApiProperty({
        description: 'Code unique du monde',
        required: true
    })
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'Nom du monde',
        required: true
    })
    @IsNotEmpty()
    libelle: string;

    @ApiProperty({
        description: 'Description du monde',
        required: true
    })
    @IsNotEmpty()
    description: string;

}
