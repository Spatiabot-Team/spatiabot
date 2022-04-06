import {DiscordGuildUserInterface} from "../../../domain/interfaces/discord-guild-user.interface";
import {DiscordGuildUser} from "../../../domain/entities/discord-guild-user.entity";
import {DiscordCdn} from "../../../application/services/discord-cdn.service";

export class DiscordGuildApiToEntityAdapter {

    static adaptToDiscordGuildUser(guild: any, socialDiscordId : string,discordPrefixDefault: string = process.env.DISCORD_PREFIX): DiscordGuildUserInterface {
        let discordGuildUser = new DiscordGuildUser();

        // DiscordGuildUser
        discordGuildUser.permissions = guild.permissions;
        discordGuildUser.isOwner = guild.owner;
        discordGuildUser.socialDiscordId = socialDiscordId;

        // DiscordGuild
        discordGuildUser.discordGuild = {
            discordGuildId: guild.id,
            name: guild.name,
            prefix: discordPrefixDefault,
            icon: DiscordCdn.buildGuildIcon(guild.id, guild.icon),
        }

        return discordGuildUser;
    }

}
