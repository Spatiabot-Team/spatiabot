import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class ParamSlugOrId {
    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `Le slug doit être renseigné`})
    slugOrId: string;

}
