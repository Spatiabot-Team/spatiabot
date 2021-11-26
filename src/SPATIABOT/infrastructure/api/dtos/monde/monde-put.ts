import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty,IsOptional} from "class-validator";

export class MondePut {

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
    nom: string;

    @ApiProperty({
        description: 'Description du monde',
        required: true
    })
    @IsOptional()
    description: string;

}
