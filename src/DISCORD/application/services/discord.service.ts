import {Injectable} from '@nestjs/common';
import {Client, Intents} from "discord.js";
import {clc} from "@nestjs/common/utils/cli-colors.util";

@Injectable()
export class DiscordService {

    clientDiscord: Client;

    constructor() {
        this.clientDiscord = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
        this.clientDiscord.on('error', e => {
            console.error(clc.red('Error with discord : '), e);
        });
        this.loginToDiscordServer();
    }

    async loginToDiscordServer() {
        try {

            // si dans x ms on a pas coupé ce setTimeout par un clearTimeout alors c'est que la connexion n'a pas abouti
            const timeout = setTimeout(() => {
                    this.clientDiscord.emit('error', Error('Connection cannot be made, is discord API down?'));
                },30000,
            );


            this.clientDiscord.once('ready', () => {
                console.log('Discord is ready')
                clearTimeout(timeout);
            });

            await this.clientDiscord.login(process.env.DISCORD_TOKEN);

        } catch (e) {
            console.log(clc.red((e.message + '. Are the rate limits good?')));
        }
    }

    addEvent(eventName, cb) {
        console.log('Discord service : an event has been added');
        this.clientDiscord.on(eventName, cb);
    }


    //
    // async sendMessages(channel, msgs: MessageEmbed[]) {
    //     msgs.forEach(m => channel.send(m));
    // }
    //
    // async findServer(id) {
    //     return await this.clientDiscord.guilds.fetch(id);
    // }
    //
    // async findChannel(channelId) {
    //     return await this.clientDiscord.channels.fetch(channelId);
    // }

    /**
     * Remplace les mots clefs
     * Par contre utilisation de split join car replaceAll n'existe pas dans cette version :(
     * A voir si c'est possible d'améliorer cette partie de code
     * @param content
     * @param message
     */
    // replaceKeyWords(content: string, message: Message): string {
    //     return content.split('$user').join(this.replaceUser(content, message));
    //
    // }

    // replaceUser(content: string, message: Message): string {
    //     return message.author.toString();
    // }
}
