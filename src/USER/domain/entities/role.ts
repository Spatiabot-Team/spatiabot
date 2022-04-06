import {RoleInterface} from "../interfaces/role.interface";

export class Role implements RoleInterface {

    id?: string | null = null;
    label: string | null = null;
}
