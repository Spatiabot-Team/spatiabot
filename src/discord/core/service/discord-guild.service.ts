import {SocialDiscord} from "../../../users/core/entity/social-discord.entity";
import {DiscordCdn} from "./discord-cdn.service";
import {DiscordGuildRepository} from "../repository/discord-guild.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {DiscordGuildUserRepository} from "../repository/discord-guild-user.repository";

@Injectable()
export class DiscordGuildService{

    constructor(
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository,
        @InjectRepository(DiscordGuildUserRepository) private readonly discordGuildUserRepository: DiscordGuildUserRepository,
        private discordCdn: DiscordCdn
    ){

    }

    async createOrUpdateDiscordGuilds(socialDiscord: SocialDiscord, guilds) {

        // Guilds
        const discordGuilds = await this.discordGuildRepository.findByGuildIds(guilds.map(g => g.id));
        for (const guild of guilds) {

            let guildDb = discordGuilds.find(g => g.guildId == guild.id);
            if (guildDb === undefined) {
                guildDb = await this.discordGuildRepository.save({
                    guildId: guild.id,
                    name: guild.name,
                    prefix: process.env.DISCORD_GUILD_PREFIX_DEFAULT,
                    icon: this.discordCdn.buildGuildIcon(guild.id, guild.icon),
                    discordGuildUsers: []
                });
            }

            // Relation between guild and social discord
            let guildUser = guildDb.discordGuildUsers.find(du => du.socialDiscord.id === socialDiscord.id);
            if (!guildUser) {
                guildUser = {socialDiscord};
            }

            await this.discordGuildUserRepository.save({
                ...guildUser,
                discordGuild: guildDb,
                permissions: guild.permissions,
                isOwner: guild.owner
            });
        }
        return discordGuilds;
    }
}
