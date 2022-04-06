import {GetUserByDiscordIdQuery} from "../impl/get-user-by-discord-id.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialDiscordRepositoryInterface} from "../../repositories/social-discord.repository.interface";
import {SocialDiscordRepository} from "../../../infrastructure/database/repositories/social-discord.repository";
import {clc} from "@nestjs/common/utils/cli-colors.util";

@QueryHandler(GetUserByDiscordIdQuery)
export class GetUserByDiscordIdHandler implements IQueryHandler<GetUserByDiscordIdQuery> {

    constructor(@InjectRepository(SocialDiscordRepository) private readonly repository: SocialDiscordRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: GetUserByDiscordIdQuery) {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'),query);
        return this.repository.findUserByDiscordId(query.discordId);
    }
}
