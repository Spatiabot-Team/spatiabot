import {RoleInterface} from "../../domain/interfaces/role.interface";

export interface RoleRepositoryInterface {
    createRole(role: RoleInterface): Promise<RoleInterface>;
    findRole(label: string): Promise<RoleInterface | undefined>;
}
