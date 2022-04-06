import {MessageEmbed} from "discord.js";

export class ChannelWriteToUserCommand {

    public discordUserId : string;
    public messageEmbeds : MessageEmbed[];

    constructor(discordUserId : string, messageEmbeds : MessageEmbed[]) {
        this.discordUserId = discordUserId;
        this.messageEmbeds = messageEmbeds;
    }
}
