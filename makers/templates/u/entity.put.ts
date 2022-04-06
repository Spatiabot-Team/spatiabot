import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsUUID, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class ###Entity###Put implements ###Entity###Interface {

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
