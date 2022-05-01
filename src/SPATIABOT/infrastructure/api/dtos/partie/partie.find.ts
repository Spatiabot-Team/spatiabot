import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID} from "class-validator";

export class PartieFind {
    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `L'id de la discord guild doit être renseigné`})
    @IsUUID("all", {message: `L'id n'est pas au bon format`, each: true})
    discordGuildUuid: string;

    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `L'id du monde doit être renseigné`})
    @IsUUID("all", {message: `L'id n'est pas au bon format`, each: true})
    mondeId: string;
}
