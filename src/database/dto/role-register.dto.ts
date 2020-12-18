import {ApiProperty} from "@nestjs/swagger";
import {RolesEnum} from "../enums/roles.enum";

export class RoleRegisterDto {

    @ApiProperty({ enum: RolesEnum})
    readonly label: string;
}
