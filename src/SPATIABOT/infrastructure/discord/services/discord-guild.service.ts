import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";
import {DiscordGuild} from "../../../../DISCORD/domain/entities/discord-guild.entity";
import {CacheKeys} from "../../cache/cache-keys";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Cache} from 'cache-manager';
import {GetDiscordGuildQuery} from "../../../../DISCORD/application/queries/impl/get-discord-guild.query";
import {CreateDiscordGuildFromDiscordCommand} from "../../../../DISCORD/application/commands/impl/create-discord-guild-from-discord.command";

@Injectable()
export class DiscordGuildService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {
    }

    /**
     *
     * @param discordGuildId
     * @private
     * @throws GuildNotFoundException
     */
    async findOrCreateDiscordGuild(discordGuildParam: any): Promise<DiscordGuild> {

        let discordGuilds = await this.cacheManager.get(CacheKeys.DISCORD_GUILDS);

        if (!discordGuilds) {
            discordGuilds = {};
            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, {}, {ttl: process.env.CACHE_DURATION_DISCORD_GUILDS || 360000});
        }

        if (!discordGuilds[discordGuildParam.id]) {
            discordGuilds[discordGuildParam.id] = await this.findOrCreateDiscordGuildInDb(discordGuildParam);
            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, discordGuilds);
        }

        return discordGuilds[discordGuildParam.id];
    }

    /**
     * Cherche l'objet discord guild en cache, si non trouvé le cherche en base
     * si toujours pas trouvé le créer et l'ajoute au cache
     * @param discordGuildParam
     * @private
     * @return DiscordGuild
     */
    private async findOrCreateDiscordGuildInDb(discordGuildParam: { id: string }): Promise<DiscordGuild> {

        let discordGuild = await this.queryBus.execute(new GetDiscordGuildQuery({discordGuildId: discordGuildParam.id}));

        if (!discordGuild) {
            discordGuild = await this.commandBus.execute(new CreateDiscordGuildFromDiscordCommand(discordGuildParam))
        }
        return discordGuild;
    }

}
