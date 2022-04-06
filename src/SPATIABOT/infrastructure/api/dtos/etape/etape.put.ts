import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";

export class EtapePut implements EtapeInterface {

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
    @IsOptional()
    titre: string;

    @ApiProperty({
        description: 'Texte de l\'etape',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le texte est trop court',
    })
    @IsOptional()
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
}
