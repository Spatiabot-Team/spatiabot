import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsUUID, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class ScenarioPost implements ScenarioInterface {

    @ApiProperty({
        description: 'Titre du scenario',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le titre est trop court',
    })
    @MaxLength(255, {
        message: 'Le titre est trop long',
    })
    titre: string;

    @ApiProperty({
        description: 'Monde dans lequel se déroule le scenario',
        required: true
    })
    @IsNotEmpty({message : `L'id du monde doit être renseigné`})
    @IsUUID("all", {message: `L'id du monde n'est pas au bon format`, each: true})
    mondeId: string;

}
