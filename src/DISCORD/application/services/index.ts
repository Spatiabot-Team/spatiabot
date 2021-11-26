import {DiscordService} from "./discord.service";
import {DiscordApi} from "./discord-api.service";
import {DiscordCdn} from "./discord-cdn.service";
import {EmbedService} from "./embed.service";
import {SendMessageService} from "./send-message.service";

export const ServicesDiscord = [
    DiscordService,
    DiscordApi,
    DiscordCdn,
    EmbedService,
    SendMessageService
];
