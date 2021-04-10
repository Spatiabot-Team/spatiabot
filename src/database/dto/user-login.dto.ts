import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
}
