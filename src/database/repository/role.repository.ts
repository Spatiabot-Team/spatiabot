import {EntityRepository, Repository} from 'typeorm';
import {Role} from "../entity/role.entity";
import {RoleRegisterDto} from "../dto/role-register.dto";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

    constructor() {
        super();
    }

    async createRole(roleRegisterDto: RoleRegisterDto) {
        return await this.save(roleRegisterDto);
    };
}
