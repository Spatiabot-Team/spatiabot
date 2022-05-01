import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID, MaxLength, MinLength} from "class-validator";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";

export class ScenarioPostWithDependancies implements ScenarioInterface {

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

    @ApiProperty()
    slug?: string;

    @ApiProperty()
    monde?: any;

    @ApiProperty()
    actif?: boolean;

    @ApiProperty()
    etapes?: EtapeInterface[];



}
