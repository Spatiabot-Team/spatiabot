import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

/**
 * https://github.com/typestack/class-validator#validation-decorators
 */
export class GenerateFixturesDto {

    @ApiProperty({
        description: 'Code pour générer les fixtures',
        required: true
    })
    @IsNotEmpty()
    readonly code: string;
}
