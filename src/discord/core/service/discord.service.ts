import {Injectable} from '@nestjs/common';
import {Client, Intents, Message, MessageEmbed, TextChannel} from "discord.js";
import {EmbedService} from "./embed.service";

@Injectable()
export class DiscordService {

    clientDiscord: Client;

    constructor(
        private embedService: EmbedService,
    ) {
        try {
            this.clientDiscord = new Client({ intents: [Intents.FLAGS.GUILDS] });

            const timeout = setTimeout(
                () => {
                    throw 'Connection cannot be made, is discord API down?'
                },
                30000,
            );
            this.clientDiscord.login(process.env.DISCORD_TOKEN).catch((error) => {
                throw new Error(error.message + '. Are the rate limits good?');
            });

            this.clientDiscord.once('ready', () => {
                clearTimeout(timeout);
                // this.clientDiscord.on("message", message => {
                //     if (message.content.startsWith('!')) {
                //         console.log('Hey ils ont écrit !!', message)
                //         message.reply("Stop spaming here!");
                //     }
                // });
            });
        } catch (e) {
            console.log("Err discord js", e);
        }
    }

    addEvent(eventName, cb) {
        this.clientDiscord.on(eventName, cb);
    }

    async sendAMessage(channelId, content: string) {

        const channel = await this.clientDiscord.channels.fetch(channelId);

        // const channel = this.clientDiscord.channels.cache.get('231151508585054208');
        if (channel instanceof TextChannel) {
            channel.send(content);
            return true;
        }
        return false;
    }

    async sendMessages(channel, msgs: MessageEmbed[]) {
        msgs.forEach(m => channel.send(m));
    }

    async findServer(id) {
        return await this.clientDiscord.guilds.fetch(id);
    }

    async findChannel(channelId) {
        return await this.clientDiscord.channels.fetch(channelId);
    }

    /**
     * Remplace les mots clefs
     * Par contre utilisation de split join car replaceAll n'existe pas dans cette version :(
     * A voir si c'est possible d'améliorer cette partie de code
     * @param content
     * @param message
     */
    replaceKeyWords(content: string, message: Message): string {
        return content.split('$user').join(this.replaceUser(content, message));

    }

    replaceUser(content: string, message: Message): string {
        return message.author.toString();
    }
}
