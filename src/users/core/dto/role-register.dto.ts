import {ApiProperty} from "@nestjs/swagger";
import {RolesEnum} from "../enum/roles.enum";

export class RoleRegisterDto {

    @ApiProperty({ enum: RolesEnum})
    readonly label: string;
}
