import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class AuteurFind {
    @ApiProperty({
        description: 'Début du username à chercher',
        required: true
    })
    @IsNotEmpty()
    username : string;
}
