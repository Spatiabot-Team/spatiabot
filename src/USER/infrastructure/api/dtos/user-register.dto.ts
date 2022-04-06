import {IsByteLength, IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

/**
 * https://github.com/typestack/class-validator#validation-decorators
 */
export class UserRegisterDto {

    @ApiProperty({
        description: 'Name of the user',
        required: true
    })
    @IsNotEmpty()
    readonly username: string | null = null;

    @ApiProperty({
        description: 'Password of the user',
        minLength: 3,
        required: true
    })
    @IsNotEmpty()
    @IsByteLength(3)
    readonly password: string | null = null;
}
