import {EntityRepository, Repository} from 'typeorm';
import {RoleEntity} from "../entities/role.entity";
import {RoleInterface} from "../../../domain/interfaces/role.interface";
import {RolesEnum} from "../../../domain/enum/roles.enum";
import {RoleRepositoryInterface} from "../../../application/repositories/role.repository.interface";

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> implements RoleRepositoryInterface {

    constructor() {
        super();
    }

    async createRole(roleRegisterDto: RoleInterface) {
        return await this.save(roleRegisterDto);
    };

    async findRole(name : RolesEnum): Promise<RoleEntity | undefined>{
        return await this.findOne({where: {label: name}});
    }

    async getDefaultRole() : Promise<RoleEntity | undefined>{
        return await this.findOne({where: {label: RolesEnum.MEMBER}})
    }
}
