import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";

export class MondePost implements MondeInterface{

    @ApiProperty({
        description: 'Code unique du monde',
        required: true
    })
    @IsNotEmpty()
    code : string;

    @ApiProperty({
        description: 'Nom du monde',
        required: true
    })
    @IsNotEmpty()
    nom : string;

    @ApiProperty({
        description: 'Description du monde',
        required: true
    })
    @IsNotEmpty()
    description : string;

}
