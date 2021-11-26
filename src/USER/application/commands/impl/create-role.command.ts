import {RoleInterface} from "../../../domain/interfaces/role.interface";

export class CreateRoleCommand {

    role: RoleInterface;

    constructor(role: RoleInterface) {
        this.role = role;
    }
}
