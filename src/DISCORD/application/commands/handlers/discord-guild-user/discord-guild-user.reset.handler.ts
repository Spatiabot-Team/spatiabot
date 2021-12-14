import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {
    DiscordGuildUserRepository
} from "../../../../infrastructure/database/repositories/discord-guild-user.repository";
import {DiscordGuildUserRepositoryInterface} from "../../../repositories/discord-guild-user.repository.interface";
import {DiscordGuildUserResetCommand} from "../../impl/discord-guild-user/discord-guild-user.reset.command";

@CommandHandler(DiscordGuildUserResetCommand)
export class DiscordGuildUserResetHandler implements IQueryHandler<DiscordGuildUserResetCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(DiscordGuildUserRepository) private readonly repository: DiscordGuildUserRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query DiscordGuildUserCreateCommand
     */
    async execute(query: DiscordGuildUserResetCommand) {
        return this.repository.delete({socialDiscordId: query.socialDiscordId});
    }
}
