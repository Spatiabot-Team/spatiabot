import {messageFromDiscordInterface} from "../interfaces/message-from-discord.interface";
import {DiscordGuild} from "./discord-guild.entity";
import {Message} from "discord.js";

export class MessageFromDiscord implements messageFromDiscordInterface {

    args : string[];
    discordGuild : DiscordGuild;

    /**
     * A voir si on a besoin du message original dans le Message
     * Mais l'idée est justement de ne pas en dépendre
     */
    message : Message;

    constructor(discordGuild: DiscordGuild) {
        this.discordGuild = discordGuild;
        this.args = [];
    }

    isAdmin(){
        // if (message.member.roles.has'roleIDHere')) console.log('User is an admin.');
        // or
        //
        // if (message.member.roles.find(role => role.name === 'Admin')) console.log('User is an admin.');
    }
}
