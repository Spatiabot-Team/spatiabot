import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {
    DiscordGuildUserBySocialDiscordQuery
} from "../../impl/discord-guild-user/discord-guild-user.by-social-discord.query";
import {
    DiscordGuildUserRepository
} from "../../../../infrastructure/database/repositories/discord-guild-user.repository";
import {DiscordGuildUserRepositoryInterface} from "../../../repositories/discord-guild-user.repository.interface";

@QueryHandler(DiscordGuildUserBySocialDiscordQuery)
export class DiscordGuildUserBySocialDiscordHandler implements IQueryHandler<DiscordGuildUserBySocialDiscordQuery> {

    constructor(@InjectRepository(DiscordGuildUserRepository) private readonly repository: DiscordGuildUserRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: DiscordGuildUserBySocialDiscordQuery) {
        return this.repository.find({
            relations : ['discordGuild'],
            where : {
                socialDiscordId : query.socialDiscordId
            }
        });
    }
}
