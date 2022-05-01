import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";
import {MessageFromDiscord} from "../../../../../DISCORD/domain/entities/message-from-discord.entity";
import {AbstractDiscordDmActionCommand} from "./abstract-discord-dm-action.command";

export class DiscordReponseCommand extends AbstractDiscordDmActionCommand {

    constructor(messageFromDiscord: MessageFromDiscord, joueur: JoueurInterface) {
        super(messageFromDiscord, joueur);

    }
}
