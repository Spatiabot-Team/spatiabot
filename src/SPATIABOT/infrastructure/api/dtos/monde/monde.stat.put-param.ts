import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID} from "class-validator";
import {StatInterface} from "../../../../domain/interfaces/stat.interface";

export class MondeStatPutParam implements StatInterface{

    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `L'id du monde doit être renseigné`})
    @IsUUID("all", {message: `L'id du monde n'est pas au bon format`, each: true})
    mondeId: string;

    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `L'id de la stat doit être renseigné`})
    @IsUUID("all", {message: `L'id de la stat n'est pas au bon format`, each: true})
    statId: string;

}
