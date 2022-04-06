import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {clc} from "@nestjs/common/utils/cli-colors.util";
import {DiscordGuildRepositoryInterface} from "../../repositories/discord-guild.repository.interface";
import {DiscordGuildRepository} from "../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordToDbAdapter} from "../../../infrastructure/database/adapters/discord-to-db.adapter";
import {CreateDiscordGuildFromDiscordCommand} from "../impl/create-discord-guild-from-discord.command";

@CommandHandler(CreateDiscordGuildFromDiscordCommand)
export class CreateDiscordGuildFromDiscordHandler implements IQueryHandler<CreateDiscordGuildFromDiscordCommand> {

    constructor(
        @InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepositoryInterface,
        readonly discordToDbAdapter: DiscordToDbAdapter
    ) {
        this.repository = repository;
    }

    async execute(query: CreateDiscordGuildFromDiscordCommand) {
        console.log(clc.yellow('Async CreateDiscordGuildsCommand...'));
        return this.repository.createDiscordGuild(this.discordToDbAdapter.adapt(query.discordGuild));
    }
}
