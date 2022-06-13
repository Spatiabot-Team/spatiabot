import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {PorteeEnum} from "../../../../domain/enums/portee.enum";

export class UnitePost implements UniteInterface {

    @ApiProperty({
        description: 'Description du monde',
        required: true
    })
    @IsNotEmpty({message: `L'id du monde est obligatoire pour rattacher l'unité`})
    @IsUUID("all", {message: `L'id du monde n'est pas au bon format`, each: true})
    mondeId: string;

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
        description: 'Description de l\'unité',
        required: true
    })
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Portée de l\'unité',
        required: true
    })
    @IsOptional()
    portee: PorteeEnum;

}
