import {DiscordGuildUserCreateCommand} from "../../impl/discord-guild-user/discord-guild-user.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildUserInterface} from "../../../../domain/interfaces/discord-guild-user.interface";
import {
    DiscordGuildUserRepository
} from "../../../../infrastructure/database/repositories/discord-guild-user.repository";
import {DiscordGuildUserRepositoryInterface} from "../../../repositories/discord-guild-user.repository.interface";

@CommandHandler(DiscordGuildUserCreateCommand)
export class DiscordGuildUserCreateHandler implements IQueryHandler<DiscordGuildUserCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(DiscordGuildUserRepository) private readonly repository: DiscordGuildUserRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query DiscordGuildUserCreateCommand
     */
    async execute(query: DiscordGuildUserCreateCommand): Promise<DiscordGuildUserInterface> {
        return this.repository.save({
            ...query.discordGuildUser
        });
    }
}
