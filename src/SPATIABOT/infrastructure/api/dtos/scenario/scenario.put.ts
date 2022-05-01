import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class ScenarioPut {

    @ApiProperty({
        description: 'Indique si le scenario est actif',
    })
    @IsBoolean()
    @IsOptional()
    actif: boolean;

    @ApiProperty({
        description: 'Titre du scenario',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    titre: string;

}
