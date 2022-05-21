import {CommandHandler} from "@nestjs/cqrs/dist/utils/command-handler.decorator";
import {DiscordReponseCommand} from "../impl/discord-reponse.command";
import {CommandBus, EventBus, IQueryHandler} from "@nestjs/cqrs";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {AnswerInChannelCommand} from "../../../../../DISCORD/application/commands/impl/answer-in-channel.command";
import {
    JoueurEtapePasDeReponseEnAttenteException
} from "../../../../domain/exceptions/joueur/joueur.etape.pas-de-reponse-en-attente.exception";
import {JoueurReponseChoisirCommand} from "../../../../application/commands/joueur/joueur.reponse.choisir.command";
import {
    JoueurEtapeEnCoursChangedEvent
} from "../../../../application/events/joueur/joueur.etape-en-cours-changed.event";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ReponseNotFoundException} from "../../../../domain/exceptions/reponse/reponse.not-found.exception";

@CommandHandler(DiscordReponseCommand)
export class DiscordReponseHandler implements IQueryHandler<DiscordReponseCommand> {

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
    async execute(query: DiscordReponseCommand) {

        try {

            // Séparer la réponse du joueur des arguments
            const reponse: string = query.messageFromDiscord.args[1];
            const args = query.messageFromDiscord.args.slice(2);

            // Indiquer au spatiabot qu'un joueur a choisi une réponse
            // Si quelque chose ne va pas le code partira dans le catch car Exception
            const reponseChoisie : ReponseInterface = await this.commandBus.execute(
                new JoueurReponseChoisirCommand(query.joueur.id, reponse, args)
            );

            // Appliquer les effets de l'étape suivante du joueur (qui est devenue étape en cours)
            this.eventBus.publish(new JoueurEtapeEnCoursChangedEvent(query.joueur.id));

            // Annoncer au joueur qu'on a pris en compte sa réponse
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                reponseChoisie.texte
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
