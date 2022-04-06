import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateRoleCommand} from "../impl/create-role.command";
import {RoleInterface} from "../../../domain/interfaces/role.interface";
import {RoleRepositoryInterface} from "../../repositories/role.repository.interface";
import {RoleRepository} from "../../../infrastructure/database/repositories/role.repository";

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements IQueryHandler<CreateRoleCommand> {

    constructor(
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepositoryInterface) {
    }

    /**
     * Si on est là c'est que le user n'existe pas donc on le crée
     * @param query
     */
    async execute(query: CreateRoleCommand): Promise<RoleInterface> {
        return this.roleRepository.createRole(query.role);
    }

}
