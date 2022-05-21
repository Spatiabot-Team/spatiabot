import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {MessageFromDiscord} from "../../../../DISCORD/domain/entities/message-from-discord.entity";
import {DiscordReponseCommand} from "../commands/impl/discord-reponse.command";
import {
    JoueurUserFindBySocialDiscordIdHandler
} from "../../../application/queries/joueur/joueur.user.find-by-social-discord-id.handler";
import {
    DiscordGuildFindByDiscordGuildIdService
} from "../../../../DISCORD/application/services/discord-guild/discord-guild.find-by-discord-guild-id.service";
import {DiscordMessageAdapter} from "../../../../DISCORD/infrastructure/adapter/discord-message.adapter";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";
import {AbstractDiscordDmActionCommand} from "../commands/impl/abstract-discord-dm-action.command";

@Injectable()
export class ActionsDmService {

    actions: { [key: string]: { event: (message: MessageFromDiscord,joueur : JoueurInterface) => AbstractDiscordDmActionCommand } } =
        {
            'r': {'event': (message: MessageFromDiscord,joueur : JoueurInterface) => new DiscordReponseCommand(message,joueur)},
            'reponse': {'event': (message: MessageFromDiscord, joueur : JoueurInterface) => new DiscordReponseCommand(message,joueur)},
        };

    constructor(
        private readonly joueurUserFindBySocialDiscordIdHandler: JoueurUserFindBySocialDiscordIdHandler,
        private readonly discordGuildFindByDiscordGuildIdService: DiscordGuildFindByDiscordGuildIdService,
        private readonly discordMessageAdapter: DiscordMessageAdapter,
        private readonly commandBus: CommandBus
    ) {
    }

    async execute(message: any) {

        // Trouver si l'auteur du message est joueur dans une partie
        const joueurs = await this.joueurUserFindBySocialDiscordIdHandler.execute(message.author.id);

        // Le but est de trouver à quelle partie il fait référence car un utilisateur peut être sur plusieurs discord
        /// donc sur plusieurs parties
        const resFromParties = Promise.all(joueurs.map(async joueur => {

            // Récupérer le discord de la partie du joueur pour avoir le préfixe
            const discordGuild = await this.discordGuildFindByDiscordGuildIdService.execute(joueur.partie.discordGuildUuid);

            if (message.content.startsWith(discordGuild.prefix)) {
                const messageFromDiscord = this.discordMessageAdapter.adaptFromDiscord(message, discordGuild);
                return this.executeActionIfExist(messageFromDiscord.args[0], messageFromDiscord,joueur)

            }

        }));

        return;
    }

    async executeActionIfExist(key : string, message: MessageFromDiscord, joueur : JoueurInterface){
        if (!this.actions[key]) {
            return false;
        }

        return await this.commandBus.execute(this.actions[key].event(message,joueur));
    }

}
