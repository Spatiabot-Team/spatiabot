import {CommandBus, CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {PartieService} from "../../services/partie.service";
import {DiscordDecollageInfraCommand} from "../impl/discord-decollage-infra.command";
import {SocialDiscordService} from "../../../../../USER/application/services/social-discord.service";
import {Message} from "discord.js";
import {SocialDiscordInterface} from "../../../../../USER/domain/interfaces/social-discord.interface";
import {PartieNotFoundException} from "../../../../domain/exceptions/partie-not-found.exception";
import {DiscordCdn} from "../../../../../DISCORD/application/services/discord-cdn.service";
import {AnswerInChannelCommand} from "../../../../../DISCORD/application/commands/impl/answer-in-channel.command";

@CommandHandler(DiscordDecollageInfraCommand)
export class DiscordDecollageInfraHandler implements IQueryHandler<DiscordDecollageInfraCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly partieService: PartieService,
        private readonly socialDiscordService: SocialDiscordService
    ) {
    }

    /**
     * Pour ajouter un joueur à une partie, il faut trouver la partie de la guilde discord
     * Créer le nouveau joueur avec les infos user donc trouver / créer le user
     * Avec ces 2 éléments on demande à la couche Application d'ajouter le joueur à la partie
     * @param query
     */
    async execute(query: DiscordDecollageInfraCommand) {

        try{
            // On hydrate un objet SocialDiscord à partir de l'objet message de la lib discord
            const socialDiscord = this.extractSocialDiscord(query.messageFromDiscord.message);

            // Si la partie n'est pas trouvé cela emet une exception partie non trouvée
            const [partie,user] = await Promise.all([
                this.partieService.findPartie(query.messageFromDiscord.discordGuild),
                this.socialDiscordService.findOrCreateUser(socialDiscord)
            ]);
            console.log(partie);
            console.log('Le user a été trouvé ! ',user);
            // newjoueur = Creer objet joueur avec les infos du user/author (user.uuid, author.name etc)

            // Lancer le décollage
            /*this.commandBus.execute(new DecollageCommand())
            .catch(e => {
                if (e instanceof DejaDecolleException) {
                    // Lancer l'event tu as déjà décollé !
                    console.log('Lancer l\'event tu as déjà décollé !');
                    return;
                }
                //C'est une erreur qu'on ne connait pas, on la throw plus haut
                throw e;
            });*/
        }catch(e){

            if(e instanceof PartieNotFoundException){
                await this.commandBus.execute(new AnswerInChannelCommand(
                    query.messageFromDiscord.message.channel,
                    'La partie n\'a pas encore démarré...'
                ));
                return;
            }
        }

    }

    private extractSocialDiscord(message: Message): SocialDiscordInterface {
        return {
            discordId: message.author.id,
            avatar: message.author.avatar,
            avatarFullLink : DiscordCdn.buildAvatar(message.author.id,message.author.avatar),
            username: message.author.username
        }
    }
}
