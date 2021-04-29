import {EntityRepository, Repository} from 'typeorm';
import {Role} from "../entity/role.entity";
import {RoleRegisterDto} from "../dto/role-register.dto";
import {RolesEnum} from "../enum/roles.enum";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

    constructor() {
        super();
    }

    async createRole(roleRegisterDto: RoleRegisterDto) {
        return await this.save(roleRegisterDto);
    };

    async findByRoleName(name : RolesEnum){
        return await this.findOne({where: {label: name}});
    }

    async getDefaultRole() : Promise<Role>{
        return await this.findOne({where: {label: RolesEnum.MEMBER}})
    }
}
