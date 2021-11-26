import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {FindRoleQuery} from "../impl/find-role.query";
import {RoleRepository} from "../../../infrastructure/database/repositories/role.repository";
import {RoleRepositoryInterface} from "../../repositories/role.repository.interface";

@QueryHandler(FindRoleQuery)
export class FindRoleHandler implements IQueryHandler<FindRoleQuery> {

    constructor(
        @InjectRepository(RoleRepository) private readonly repository: RoleRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: FindRoleQuery) {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'), query);
        return this.repository.findRole(query.label);
    }
}
