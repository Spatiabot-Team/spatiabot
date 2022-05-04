import {MessageEmbed} from "discord.js";

export class ChannelWriteCommand {

    public channelId : string;
    public messageEmbeds : MessageEmbed[];

    constructor(channelId : string, messageEmbeds : MessageEmbed[]) {
        this.channelId = channelId;
        this.messageEmbeds = messageEmbeds;
    }
}
