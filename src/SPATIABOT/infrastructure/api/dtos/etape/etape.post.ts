import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsOptional, IsUUID, MaxLength, MinLength} from "class-validator";

export class EtapePost implements EtapeInterface {

    @ApiProperty({
        description: 'Titre de l\'etape',
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
        description: 'Texte de l\'etape',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le texte est trop court',
    })
    texte: string;

    @ApiProperty({
        description: 'Est-ce que cette étape est la première du scenario ?',
        required: true
    })
    @IsBoolean()
    @IsOptional()
    premiereEtape: boolean;

    @ApiProperty({
        description: 'Est-ce que cette étape marque la fin du scenario ?',
        required: true
    })
    @IsBoolean()
    @IsOptional()
    finScenario: boolean;

    @ApiProperty({
        description: 'Est-ce un game over ?',
        required: true
    })
    @IsBoolean()
    @IsOptional()
    gameOver: boolean;

    @ApiProperty({
        description: 'Scenraio dans lequel se déroule l\'etape',
        required: true
    })
    @IsNotEmpty({message : `L'id du scenario doit être renseigné`})
    @IsUUID("all", {message: `L'id du scenario n'est pas au bon format`, each: true})
    scenarioId: string;

}
