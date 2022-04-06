import {StatInterface} from "../../../../domain/interfaces/stat.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsUUID, IsNotEmpty, MinLength, MaxLength} from "class-validator";

export class StatPost implements StatInterface {

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
