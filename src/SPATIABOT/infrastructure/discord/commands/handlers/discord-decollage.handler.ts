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

@CommandHandler(DiscordDecollageCommand)
export class DiscordDecollageHandler implements IQueryHandler<DiscordDecollageCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly partieService: PartieService,
        private readonly socialDiscordService: SocialDiscordService,
        private readonly logger: WinstonLogger,
    ) {
    }

    /**
     * Pour ajouter un joueur à une partie, il faut trouver la partie de la guilde discord
     * Créer le nouveau joueur avec les infos user donc trouver / créer le user
     * Avec ces 2 éléments on demande à la couche Application d'ajouter le joueur à la partie
     *
     * Puis on affecte un scenario au joueur
     *
     * Enfin on annonce au monde qu'il a décollé, youpi ! En vol pour pleins d'aventures !!!
     *
     * @param query
     */
    async execute(query: DiscordDecollageCommand) {

        try {

            // On hydrate un objet SocialDiscord à partir de l'objet message de la lib discord
            const socialDiscord = this.extractSocialDiscord(query.messageFromDiscord.message);

            // Si la partie n'est pas trouvé cela emet une exception partie non trouvée
            const [partie, user] = await Promise.all([
                this.partieService.findPartie(query.messageFromDiscord.discordGuild),
                this.socialDiscordService.findOrCreateUser(socialDiscord)
            ]);

            // Décollage !
            const joueur = await this.commandBus.execute(new JoueurCreateCommand(partie, user))

            // Sélectionner le premier scenario
            await this.commandBus.execute(new JoueurScenarioAffecterCommand(joueur.id));

            // Annoncer le décollage
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                `Un décollage vient d\'avoir lieu, celui de ${joueur.user.username}`
            ));
        } catch (e) {
            return this.parseError(e, query);
        }
    }

    async parseError(e, query) {
        if (e instanceof PartieNotFoundException) {
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                'La partie n\'a pas encore démarré...'
            ));
            return;
        }

        if (e instanceof JoueurAlreadyInPartieException) {
            await this.commandBus.execute(new AnswerInChannelCommand(
                query.messageFromDiscord.message.channel,
                `Tu as déjà décollé ${query.messageFromDiscord.message.author.username}...`
            ));
            return;
        }

        this.logger.error(e);
        await this.commandBus.execute(new AnswerInChannelCommand(
            query.messageFromDiscord.message.channel,
            `Oh non ${query.messageFromDiscord.message.author.username}... il y a visiblement beaucoup de brouillard dans le cosmos en ce moment, attends quelques temps que tout cela s'éclaircisse`
        ));
        return;
    }


    private extractSocialDiscord(message: Message): SocialDiscordInterface {
        return {
            discordId: message.author.id,
            avatar: message.author.avatar,
            avatarFullLink: DiscordCdn.buildAvatar(message.author.id, message.author.avatar),
            username: message.author.username
        }
    }
}
