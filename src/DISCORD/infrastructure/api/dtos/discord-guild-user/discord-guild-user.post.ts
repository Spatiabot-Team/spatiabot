import {DiscordGuildUserInterface} from "../../../../domain/interfaces/discord-guild-user.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsUUID, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class DiscordGuildUserPost implements DiscordGuildUserInterface {

    // @ApiProperty({
    //     description: 'Titre',
    //     required: true
    // })
    // @IsNotEmpty()
    // @MinLength(1, {
    //     message: 'Le titre est trop court',
    // })
    // @MaxLength(255, {
    //     message: 'Le titre est trop long',
    // })
    // titre: string;
}
