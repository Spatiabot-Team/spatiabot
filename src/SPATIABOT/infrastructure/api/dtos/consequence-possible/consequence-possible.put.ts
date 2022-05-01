import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class ConsequencePossiblePut implements ConsequencePossibleInterface {

    @ApiProperty({
        description: 'Poids',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    poids: number;

    @ApiProperty({
        description: 'Etape suivante',
        required: true
    })
    @IsNotEmpty()
    @IsUUID("all", {message: `L'id de l'étape suivante n'est pas au bon format`, each: true})
    etapeSuivanteId: string;
}
