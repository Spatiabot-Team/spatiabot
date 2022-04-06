import {DiscordChannelInterface} from "../interfaces/discord-channel.interface";

export class DiscordChannel implements DiscordChannelInterface {

    id?: string;
    channelId: string;
    name: string;
}
