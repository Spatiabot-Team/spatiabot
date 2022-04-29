import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class MondePut {

    @ApiProperty({
        description: 'Code unique du monde',
        required: true
    })
    @IsNotEmpty()
    @IsOptional()
    code: string;

    @ApiProperty({
        description: 'Nom du monde',
        required: true
    })
    @IsNotEmpty()
    @IsOptional()
    nom: string;

    @ApiProperty({
        description: 'Description du monde',
        required: true
    })
    @IsOptional()
    @IsOptional()
    description: string;

}
