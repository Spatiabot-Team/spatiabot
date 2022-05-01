import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class AuteurFindByIds {
    @ApiProperty({
        description: 'La recherche doit contenir au moins 1 id',
        required: true
    })
    @IsNotEmpty()
    ids: string[];
}
