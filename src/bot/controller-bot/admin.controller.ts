import {DiscordService} from "../service/discord.service";
import {EmbedService} from "../service/embed.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AdminController {

    constructor(
        private discordService: DiscordService,
        private embedService: EmbedService
    ) {
    }

    creerPartie(message) {
        console.log("ben on crée une partie quoi :)")
        return;
    }

}
