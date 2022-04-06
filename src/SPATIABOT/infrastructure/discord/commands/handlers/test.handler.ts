import {CommandBus, CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {PartieService} from "../../services/partie.service";
import {DiscordDecollageCommand} from "../impl/discord-decollage.command";
import {SocialDiscordService} from "../../../../../USER/application/services/social-discord.service";
import {Message} from "discord.js";
import {SocialDiscordInterface} from "../../../../../USER/domain/interfaces/social-discord.interface";
import {PartieNotFoundException} from "../../../../domain/exceptions/partie-not-found.exception";
import {DiscordCdn} from "../../../../../DISCORD/application/services/discord-cdn.service";
import {AnswerInChannelCommand} from "../../../../../DISCORD/application/commands/impl/answer-in-channel.command";
import {JoueurCreateCommand} from "../../../../application/commands/impl/joueur/joueur.create.command";
import {JoueurAlreadyInPartieException} from "../../../../domain/exceptions/joueur/joueur-already-in-partie.exception";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {
    JoueurScenarioAffecterCommand
} from "../../../../application/commands/impl/joueur/joueur.scenario.affecter.command";
import {TestCommand} from "../impl/test.command";
import {
    JoueurEtapeFindAllAAfficherHandler
} from "../../../../application/services/joueur/joueur.etape.find-all-a-afficher.handler";
import {
    ChannelWriteToUserHandler
} from "../../../../../DISCORD/application/commands/handlers/channel/channel.write-to-user.handler";
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
