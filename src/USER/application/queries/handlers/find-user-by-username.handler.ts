import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialDiscordRepositoryInterface} from "../../repositories/social-discord.repository.interface";
import {SocialDiscordRepository} from "../../../infrastructure/database/repositories/social-discord.repository";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {FindUserByUsernameQuery} from "../impl/find-user-by-username.query";
import {UserRepository} from "../../../infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../repositories/user.repository.interface";

@QueryHandler(FindUserByUsernameQuery)
export class FindUserByUsernameHandler implements IQueryHandler<FindUserByUsernameQuery> {

    constructor(@InjectRepository(UserRepository) private readonly repository: UserRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: FindUserByUsernameQuery) {
        console.log(clc.cyanBright('Async FindUserByUsernameQuery...'),query);
        return this.repository.findUserByUsername(query.username);
    }
}
