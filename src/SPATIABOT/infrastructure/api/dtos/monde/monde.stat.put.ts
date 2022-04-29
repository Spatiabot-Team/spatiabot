import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";
import {StatInterface} from "../../../../domain/interfaces/stat.interface";

export class MondeStatPut implements StatInterface{

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
    @IsOptional()
    quantite : number;

    @ApiProperty({
        description: 'Nombre d\'éléments de la stat',
        required: true
    })
    @IsNotEmpty()
    @IsOptional()
    unite : {id:string};

}
