import {DiscordService} from "../service/discord.service";
import {EmbedService} from "../service/embed.service";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {JoueurRepository} from "../../database/repository/joueur.repository";

@Injectable()
export class BotController {

    constructor(
        private discordService: DiscordService,
        private embedService: EmbedService,
        @InjectRepository(JoueurRepository) private readonly joueurRepository: JoueurRepository,
    ) {
    }

    notFound(message) {
        message.channel.send({
            embed: this.embedService.embedMessage({
                description: "Euh...je n'ai pas très bien compris :thinking: "
            })
        });
    }

    noGameInProgress(message) {
        message.channel.send({
            embed: this.embedService.embedMessage({
                description: "Il n'y a pas de partie en cours :( Vois avec l'admin pour commencer une partie ! :p"
            })
        });
        return true;
    }
}
