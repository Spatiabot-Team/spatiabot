import {DiscordGuildCreateCommand} from "../../impl/discord-guild/discord-guild.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../../repositories/discord-guild.repository.interface";
import {DiscordGuildInterface} from "../../../../domain/interfaces/discord-guild.interface";
import {DiscordGuildFindOrCreateCommand} from "../../impl/discord-guild/discord-guild.find-or-create.command";

@CommandHandler(DiscordGuildFindOrCreateCommand)
export class DiscordGuildFindOrCreateHandler implements IQueryHandler<DiscordGuildFindOrCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query DiscordGuildCreateCommand
     */
    async execute(query: DiscordGuildCreateCommand): Promise<DiscordGuildInterface> {

        const discordGuildDb = await this.repository.findOne({discordGuildId : query.discordGuild.discordGuildId});
        if(discordGuildDb){
            return discordGuildDb;
        }

        return await this.repository.save({
            ...query.discordGuild
        });
    }
}
