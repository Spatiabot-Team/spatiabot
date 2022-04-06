import {DiscordGuildController} from "./discord-guild.controller";
import {DiscordGuildSyncByConnectedUserController} from "./discord-guild/discord-guild.sync-by-connected-user.controller";
import {DiscordGuildByConnectedUserController} from "./discord-guild/discord-guild.by-connected-user.controller";


export const ControllersDiscord = [
    DiscordGuildController,
    DiscordGuildSyncByConnectedUserController,
    DiscordGuildByConnectedUserController
];
