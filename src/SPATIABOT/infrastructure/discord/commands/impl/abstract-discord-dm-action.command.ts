import {MessageFromDiscord} from "../../../../../DISCORD/domain/entities/message-from-discord.entity";
import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";

export abstract class AbstractDiscordDmActionCommand {
    messageFromDiscord: MessageFromDiscord;
    joueur : JoueurInterface;

    constructor(messageFromDiscord: MessageFromDiscord, joueur : JoueurInterface) {
        this.messageFromDiscord = messageFromDiscord;
        this.joueur = joueur;
    }
}
