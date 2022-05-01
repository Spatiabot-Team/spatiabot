import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class ReponsePut implements ReponseInterface {

    @ApiProperty({
        description: 'Titre',
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
        description: 'Libelle',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le libellé est trop court',
    })
    @MaxLength(50, {
        message: 'Le libellé est trop long',
    })
    libelle: string;

    @ApiProperty({
        description: 'Texte',
        required: true
    })
    @IsNotEmpty()
    texte: string;
}
