import {MessageFromDiscord} from "../../../../../DISCORD/domain/entities/message-from-discord.entity";

export abstract class AbstractDiscordActionCommand {
    messageFromDiscord: MessageFromDiscord;

    constructor(messageFromDiscord: MessageFromDiscord) {
        this.messageFromDiscord = messageFromDiscord;
    }
}
