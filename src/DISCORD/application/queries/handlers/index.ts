import {GetDiscordGuildHandler} from "./get-discord-guild.handler";
import {GetDiscordGuildsHandler} from "./get-discord-guilds.handler";
import {
    DiscordGuildUserBySocialDiscordHandler
} from "./discord-guild-user/discord-guild-user.by-social-discord.handler";

export const QueryHandlers = [
    GetDiscordGuildHandler,
    GetDiscordGuildsHandler,
    DiscordGuildUserBySocialDiscordHandler
];
