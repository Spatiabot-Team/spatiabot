import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {CommandBus} from "@nestjs/cqrs";
import {WinstonLogger} from "../../../LOGGER/winston-logger";
import {DiscordService} from "../../../DISCORD/application/services/discord.service";
import {
    JoueurFindAllEnAttenteScenarioHandler
} from "../../application/queries/joueur/joueur.find-all-en-attente-scenario.handler";
import {JoueurScenarioAffecterCommand} from "../../application/commands/joueur/joueur.scenario.affecter.command";

/**
 * Affecte un scenario aux joueurs qui ont un été d'étape EN_ATTENTE_SCENARIO
 * (si on a des scenarios de dispo)
 */
@Injectable()
export class AffecterScenarioJoueurAttenteCron {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly joueurFindAllEnAttenteScenarioHandler: JoueurFindAllEnAttenteScenarioHandler,
        private readonly discordService: DiscordService,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {

        if (process.env.CRON_ACTIF === 'true' && this.discordService.ready) {

            // Récupérer tous les joueurs qui ont une étape à afficher avec l'étape en question
            const joueurs = await this.joueurFindAllEnAttenteScenarioHandler.execute();
            if(joueurs.length > 0){
                Promise.all(joueurs.map(j =>
                    this.commandBus.execute(new JoueurScenarioAffecterCommand(j.id))
                ));
            }
        }
    }
}
