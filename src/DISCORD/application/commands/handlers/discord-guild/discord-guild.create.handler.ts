import {DiscordGuildCreateCommand} from "../../impl/discord-guild/discord-guild.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../../repositories/discord-guild.repository.interface";
import {DiscordGuildInterface} from "../../../../domain/interfaces/discord-guild.interface";

@CommandHandler(DiscordGuildCreateCommand)
export class DiscordGuildCreateHandler implements IQueryHandler<DiscordGuildCreateCommand> {

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
        return this.repository.save({
            ...query.discordGuild
        });
    }
}
