import {MessageFromDiscord} from "../../domain/entities/message-from-discord.entity";
import {Message} from "discord.js";
import {Injectable} from "@nestjs/common";
import {DiscordGuild} from "../../domain/entities/discord-guild.entity";

@Injectable()
export class DiscordMessageAdapter {

    /**
     * Version de discord ^13.1.0
     * @param message
     * @param discordGuild
     */
    adaptFromDiscord(message: Message, discordGuild: DiscordGuild): MessageFromDiscord {

        const messageFromDiscord = new MessageFromDiscord(discordGuild);

        messageFromDiscord.args = this.parseArgs(message, discordGuild.prefix);
        messageFromDiscord.message = message;

        return messageFromDiscord;
    }

    parseArgs(message: any, prefix: string = '!') {
        const content = message.content.replace(prefix, "");
        return content.trim().split(/ +/g); // [0:commande, 1:argument1 2: argument2]
    }
}
