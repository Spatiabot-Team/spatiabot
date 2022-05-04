import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class MessagePost implements EtapeInterface {

    @ApiProperty({
        description: 'Titre du message',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le titre du message est trop court',
    })
    @MaxLength(255, {
        message: 'Le titre du message est trop long',
    })
    titre: string;

    @ApiProperty({
        description: 'Texte du message',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le texte  du message est trop court',
    })
    texte: string;

    @ApiProperty({
        description: 'Channel dans lequel poster le message',
        required: true
    })
    @IsNotEmpty()
    @MinLength(1, {
        message: 'Le channel doit êre indiqué',
    })
    channelId: string;

}
