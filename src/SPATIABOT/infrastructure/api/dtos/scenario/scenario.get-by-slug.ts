import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID} from "class-validator";

export class ScenarioGetBySlug {
    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `Le slug doit être renseigné`})
    slug: string;

    @ApiProperty({
        description: '',
        required: true
    })
    @IsNotEmpty({message: `Le monde doit être renseigné`})
    @IsUUID()
    mondeId: string;
}
