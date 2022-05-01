import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";
import {DiscordGuild} from "../../../../DISCORD/domain/entities/discord-guild.entity";
import {CacheKeys} from "../../cache/cache-keys";
import {CommandBus} from "@nestjs/cqrs";
import {Cache} from 'cache-manager';
import {GetDiscordGuildQuery} from "../../../../DISCORD/application/queries/impl/get-discord-guild.query";
import {
    CreateDiscordGuildFromDiscordCommand
} from "../../../../DISCORD/application/commands/impl/create-discord-guild-from-discord.command";
import {GetDiscordGuildHandler} from "../../../../DISCORD/application/queries/handlers/get-discord-guild.handler";
import {DiscordGuildInterface} from "../../../../DISCORD/domain/interfaces/discord-guild.interface";

/**
 * @todo à refactorer, ça devrait être dans le module Discord dans la partie application et non infra
 */
@Injectable()
export class DiscordGuildService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly commandBus: CommandBus,
        private readonly getDiscordGuildHandler: GetDiscordGuildHandler
    ) {
    }

    /**
     * Cherche l'objet discord guild en cache, si non trouvé le cherche en base
     * si toujours pas trouvé le créer et l'ajoute au cache
     * @param discordGuildId
     * @private
     * @throws GuildNotFoundException
     */
    async findOrCreateDiscordGuild(discordGuildParam: any): Promise<DiscordGuild> {

        let discordGuilds = await this.cacheManager.get(CacheKeys.DISCORD_GUILDS);

        // Si disocrdGuilds n'existe pas en cache on doit initialiser le cache
        if (!discordGuilds) {
            discordGuilds = {};

            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, {}, {ttl: process.env.CACHE_DURATION_DISCORD_GUILDS || 360000});
        }

        // Maintenant on peut vérifier que notre guild est ou non en cache
        if (!discordGuilds[discordGuildParam.id]) {
            discordGuilds[discordGuildParam.id] = await this.findOrCreateDiscordGuildInDb(discordGuildParam);
            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, discordGuilds);
        }

        return discordGuilds[discordGuildParam.id];
    }

    /**
     *
     * @param discordGuildParam
     * @private
     * @return DiscordGuild
     */
    private async findOrCreateDiscordGuildInDb(discordGuildParam: { id: string }): Promise<DiscordGuildInterface> {

        let discordGuild= await this.getDiscordGuildHandler.execute(new GetDiscordGuildQuery({discordGuildId: discordGuildParam.id}));

        if (!discordGuild) {
            discordGuild = await this.commandBus.execute(new CreateDiscordGuildFromDiscordCommand(discordGuildParam))
        }
        return discordGuild;
    }

}
