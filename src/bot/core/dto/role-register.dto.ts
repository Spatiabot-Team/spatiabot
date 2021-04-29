import {ApiProperty} from "@nestjs/swagger";
import {RolesEnum} from "../../../users/core/enum/roles.enum";

export class RoleRegisterDto {

    @ApiProperty({ enum: RolesEnum})
    readonly label: string;
}
