import {CommandBus, CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {TestCommand} from "../impl/test.command";
import {
    JoueurEtapeFindAllAAfficherHandler
} from "../../../../application/services/joueur/joueur.etape.find-all-a-afficher.handler";
import {
    ChannelWriteToUserCommand
} from "../../../../../DISCORD/application/commands/impl/channel/channel.write-to-user.command";
import {MessageEmbedEtapeService} from "../../services/message/message.embed-etape.service";

@CommandHandler(TestCommand)
export class TestHandler implements IQueryHandler<TestCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly joueurEtapeFindAllAAfficherHandler: JoueurEtapeFindAllAAfficherHandler,
        private readonly messageEmbedEtapeService: MessageEmbedEtapeService,
        private readonly logger: WinstonLogger,
    ) {
    }


    async execute(query: TestCommand) {

        // Récupérer tous les joueurs qui ont une étape à afficher avec l'étape en question
        const joueurs = await this.joueurEtapeFindAllAAfficherHandler.execute();

        // Envoyer l'étape aux joueurs ! (ça en jette !)
        await Promise.all(joueurs.map(joueur =>
            this.commandBus.execute(new ChannelWriteToUserCommand(
                    joueur.user.socialDiscord.discordId,
                    this.messageEmbedEtapeService.execute(joueur.etapeEnCours)
                )
            ))
        );
    }
}
