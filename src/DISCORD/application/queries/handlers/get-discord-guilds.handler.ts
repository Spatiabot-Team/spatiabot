import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetPartieByDiscordGuildQuery} from "../impl/get-discord-guilds.query";
import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {DiscordGuildRepository} from "../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../repositories/discord-guild.repository.interface";

@QueryHandler(GetPartieByDiscordGuildQuery)
export class GetDiscordGuildsHandler implements IQueryHandler<GetPartieByDiscordGuildQuery> {

    constructor(@InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: GetPartieByDiscordGuildQuery) {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'));
        return this.repository.findAll();
    }
}
