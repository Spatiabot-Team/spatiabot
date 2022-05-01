import {PartieInterface} from "../../../../domain/interfaces/partie.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export class PartiePost implements PartieInterface {

    @ApiProperty({
        description: 'Scenraio dans lequel se déroule l\'etape',
        required: true
    })
    @IsNotEmpty({message : `L'id du serveur discord`})
    @IsUUID("all", {message: `L'id du serveur discord n'est pas au bon format`, each: true})
    discordGuildUuid: string;

    @ApiProperty({
        description: 'Scenraio dans lequel se déroule l\'etape',
        required: true
    })
    @IsNotEmpty({message : `L'id du monde doit être renseigné`})
    @IsUUID("all", {message: `L'id du monde n'est pas au bon format`, each: true})
    mondeId: string;

    @ApiProperty({
        description: 'Stats de la partie',
        required: true
    })
    @IsOptional()
    statsMonde: any;
}
