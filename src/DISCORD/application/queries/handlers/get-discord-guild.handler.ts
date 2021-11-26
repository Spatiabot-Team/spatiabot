import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetPartieByDiscordGuildQuery} from "../impl/get-discord-guilds.query";
import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {DiscordGuildRepository} from "../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../repositories/discord-guild.repository.interface";
import {GetDiscordGuildQuery} from "../impl/get-discord-guild.query";

@QueryHandler(GetDiscordGuildQuery)
export class GetDiscordGuildHandler implements IQueryHandler<GetDiscordGuildQuery> {

    constructor(@InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: GetDiscordGuildQuery) {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'),query);
        return this.repository.findOneByDiscordGuildId(query.discordGuildId);
    }
}
