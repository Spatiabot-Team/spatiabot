import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {DiscordGuildRepository} from "../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../repositories/discord-guild.repository.interface";
import {GetDiscordGuildQuery} from "../impl/get-discord-guild.query";
import {DiscordGuildInterface} from "../../../domain/interfaces/discord-guild.interface";

export class GetDiscordGuildHandler {

    constructor(@InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: GetDiscordGuildQuery): Promise<DiscordGuildInterface> {
        console.log(clc.cyanBright('Async GetDiscordGuildsQuery...'), query);
        return this.repository.findOneByDiscordGuildId(query.discordGuildId);
    }
}
