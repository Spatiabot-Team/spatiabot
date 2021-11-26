import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {GetUserByIdQuery} from "../impl/get-user-by-id.query";
import {UserRepositoryInterface} from "../../repositories/user.repository.interface";
import {UserRepository} from "../../../infrastructure/database/repositories/user.repository";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {

    constructor(@InjectRepository(UserRepository) private readonly repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: GetUserByIdQuery) {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'), query);
        return this.repository.findOne(query.id);
    }
}
