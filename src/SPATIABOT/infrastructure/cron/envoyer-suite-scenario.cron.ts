import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {
    ChannelWriteToUserCommand
} from "../../../DISCORD/application/commands/impl/channel/channel.write-to-user.command";
import {CommandBus} from "@nestjs/cqrs";
import {
    JoueurEtapeFindAllAAfficherHandler
} from "../../application/queries/joueur/joueur.etape.find-all-a-afficher.handler";
import {MessageEmbedEtapeService} from "../discord/services/message/message.embed-etape.service";
import {WinstonLogger} from "../../../LOGGER/winston-logger";

import {EtapeEtatEnum} from "../../domain/enums/etape-etat.enum";
import {DiscordService} from "../../../DISCORD/application/services/discord.service";
import {
    JoueurEtapeChangerEtatMultiCommand
} from "../../application/commands/joueur/joueur.etape.changer-etat-multi.command";

@Injectable()
export class EnvoyerSuiteScenarioCron {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly joueurEtapeFindAllAAfficherHandler: JoueurEtapeFindAllAAfficherHandler,
        private readonly messageEmbedEtapeService: MessageEmbedEtapeService,
        private readonly discordService: DiscordService,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {

        if (process.env.CRON_ACTIF === 'true' && this.discordService.ready) {

            // Récupérer tous les joueurs qui ont une étape à afficher avec l'étape en question
            const joueurs = await this.joueurEtapeFindAllAAfficherHandler.execute();

            // Envoyer l'étape aux joueurs ! (ça en jette !)
            await Promise.all(joueurs.map(joueur => this.commandBus.execute(
                    new ChannelWriteToUserCommand(
                        joueur.user.socialDiscord.discordId,
                        this.messageEmbedEtapeService.execute(joueur.etapeEnCours)
                    )
                ))
            );

            // Mettre à jour l'état de l'étape en cours
            if (joueurs.length > 0) {
                await this.commandBus.execute(new JoueurEtapeChangerEtatMultiCommand(
                    joueurs.map(j => j.id), EtapeEtatEnum.ATTENTE_REPONSE
                ));
            }
        }
    }
}
