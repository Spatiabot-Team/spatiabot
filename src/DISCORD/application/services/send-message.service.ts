import {Injectable} from "@nestjs/common";
import {DiscordService} from "./discord.service";

@Injectable()
export class SendMessageService {

    constructor(private readonly discordService : DiscordService) {
    }

    // getClientDiscord(){
    //     reutnr
    // }
    //
    // async sendAMessage(channelId, content: string) {
    //
    //     const channel = await this.clientDiscord.channels.fetch(channelId);
    //
    //     // const channel = this.clientDiscord.channels.cache.get('231151508585054208');
    //     if (channel instanceof TextChannel) {
    //         channel.send(content);
    //         return true;
    //     }
    //     return false;
    // }

}
