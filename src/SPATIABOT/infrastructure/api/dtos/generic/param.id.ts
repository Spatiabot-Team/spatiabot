import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID} from "class-validator";

export class ParamId {
    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `L'id doit être renseigné`})
    @IsUUID("all", {message: `L'id n'est pas au bon format`, each: true})
    id: string;

}
