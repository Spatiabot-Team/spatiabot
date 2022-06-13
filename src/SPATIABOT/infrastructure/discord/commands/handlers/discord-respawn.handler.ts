import {CommandHandler} from "@nestjs/cqrs/dist/utils/command-handler.decorator";
import {CommandBus, EventBus, IQueryHandler} from "@nestjs/cqrs";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {AnswerInChannelCommand} from "../../../../../DISCORD/application/commands/impl/answer-in-channel.command";
import {
    JoueurEtapePasDeReponseEnAttenteException
} from "../../../../domain/exceptions/joueur/joueur.etape.pas-de-reponse-en-attente.exception";
import {ReponseNotFoundException} from "../../../../domain/exceptions/reponse/reponse.not-found.exception";
import {DiscordRespawnCommand} from "../impl/discord-respawn.command";
import {JoueurScenarioAffecterCommand} from "../../../../application/commands/joueur/joueur.scenario.affecter.command";

@CommandHandler(DiscordRespawnCommand)
export class DiscordRespawnHandler implements IQueryHandler<DiscordRespawnCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private eventBus: EventBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    /**
     *
     * @param query
     */
    async execute(query: DiscordRespawnCommand) {

        try {

            if( !query.joueur.etapeEnCours.gameOver){
                await this.commandBus.execute(new AnswerInChannelCommand(
                    query.messageFromDiscord.message.channel,
                    `Mais...vous n'êtes pas mort...pourquoi donc vouloir respawn ?`
                ));
                return;
            }

            // Affecter un autre scenario au joueur
            this.commandBus.execute(new JoueurScenarioAffecterCommand(query.joueur.id))

            // Annoncer au joueur qu'il a pris un nouveau départ
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                `Votre conscience et votre mémoire ont été réinjectées dans un nouveau corps.\n
                Suite à une longue période de remise en forme et d'adaptation à votre nouvelle enveloppe, vous êtes fin prêt à reprendre les commandes de votre vaisseau.
                L'excitation du décollage est toujours là, les moteurs commence à gronder..\n
                C'est parti !\n
                `
            ));

        } catch (e) {
            return this.parseError(e, query);
        }
    }

    async parseError(e: Error, query) {

        if (e instanceof ReponseNotFoundException) {
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                `Cette réponse n'existe pas`
            ));
            return;
        }

        if (e instanceof JoueurEtapePasDeReponseEnAttenteException) {
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                `Nous n'attendons pas de réponse de votre part`
            ));
            return;
        }
        this.logger.error(e);
        return;
    }

}
