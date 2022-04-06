import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {StatInterface} from "../../../../domain/interfaces/stat.interface";

export class MondeStatPost implements StatInterface{

    @ApiProperty({
        description: 'Description de la stat',
        required: true
    })
    @IsOptional()
    texte : string;

    @ApiProperty({
        description: 'Nombre d\'éléments de la stat',
        required: true
    })
    @IsNotEmpty()
    quantite : number;

    @ApiProperty({
        description: 'Nombre d\'éléments de la stat',
        required: true
    })
    @IsNotEmpty()
    unite : {id:string};

}
