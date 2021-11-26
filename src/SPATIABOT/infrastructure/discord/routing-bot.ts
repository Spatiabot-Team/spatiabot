import {Injectable} from "@nestjs/common";
import {DiscordService} from "../../../DISCORD/application/services/discord.service";
import {ActionsService} from "./services/actions.service";
import {DiscordMessageAdapter} from "../../../DISCORD/infrastructure/adapter/discord-message.adapter";
import {WinstonLogger} from "../../../LOGGER/winston-logger";
import {DiscordGuildService} from "./services/discord-guild.service";
import {ActionNotFoundException} from "./exceptions/action-not-found.exception";


@Injectable()
export class RoutingBot {

    defaultPrefix: string;

    constructor(
        private readonly discordService: DiscordService,
        private readonly actionsService: ActionsService,
        private readonly discordMessageAdapter: DiscordMessageAdapter,
        private readonly logger: WinstonLogger,
        private readonly discordGuildService : DiscordGuildService
    ) {
        this.defaultPrefix = process.env.BOT_PREFIX || "!";
        this.discordService.addEvent("messageCreate", (message) => this.handler(message));
    }

    async handler(message) {

        try {

            //Est-ce en dm ?
            if (message.channel.type === "dm") {
                return;
            }

            const discordGuild = await this.discordGuildService.findOrCreateDiscordGuild(message.guild);

            //@todo vérifier s'il y a une whitelist des channel pour ce serveur (en gro est-on autorisé à prendre en compte ce mesage)

            if (message.content.startsWith(discordGuild.prefix)) {
                const messageFromDiscord = this.discordMessageAdapter.adaptFromDiscord(message, discordGuild);
                await this.actionsService.execute(messageFromDiscord.args[0], messageFromDiscord); // Peut être faire un adapt et passer un objet de domaine
            }

        } catch (e) {
            if(e instanceof ActionNotFoundException){
                //@todo emit "cette action n'existe pas"
                return;
            }
            console.error('ERROR RoutingBot : ', e);
            this.logger.error(e);
        }

    }

    // async handler(message) {
    //     try {
    //         let curentDiscordGuild = null;
    //
    //         if (message.channel.type === "dm") {
    //
    //             // Trouver dans quelle partie il est joueur
    //             const joueurs = await this.joueurRepository.findByDiscordUserId(message.author.id)
    //             if (joueurs.length === 0) {
    //                 console.log('Joueur non trouvé en dm');
    //                 return;
    //             }
    //             // On prend la première partie par facilité
    //             // @todo pousser l'analyse pour savoir à quelle partie/serveur fait référence l'author
    //             // pour l'instant on joue sur le fait qu'un user n'utilise le bot que sur un serveur
    //             curentDiscordGuild = joueurs[0].partie.discordGuild;
    //         } else {
    //             curentDiscordGuild = await this.fetchCurrentDiscordGuild(message);
    //         }
    //
    //         if (!curentDiscordGuild) {
    //             // Pas de serveur trouvé, on ne fait rien !
    //             return;
    //         }
    //
    //         // Ca commence par le préfix ?
    //         if (message.content.startsWith(curentDiscordGuild.prefix)) {
    //
    //             // On récupère la commande et les arguments (ce qui suit derière le préfixe)
    //             //@todo améliorer le trim split pour gérer des guillements (groupe de mots)
    //             message.content = message.content.replace(this.prefix, "");
    //             message.args = message.content.trim().split(/ +/g); // [0:commande, 1:argument1 2: argument2]
    //
    //             // La commande existe ?
    //             if (this.ROUTES[message.args[0]] !== undefined) {
    //
    //                 // Commande Admin ?
    //                 if (this.ROUTES[message.args[0]].type === RouteTypeEnum.ADMIN) {
    //                     return this.ROUTES[message.args[0]].route(message);
    //                 }
    //
    //                 // Pour une commande de type partie, on vérifie qu'il y ait une partie en cours
    //                 const currentPartie = await this.partieService.findCurrentOfDiscordGuild(curentDiscordGuild.id);
    //
    //                 if (!currentPartie) {
    //                     // dsl mais il n'y a pas de partie en cours :( (demande à ton admin ! :p)
    //                     return this.botController.noGameInProgress(message);
    //                 }
    //
    //                 return this.ROUTES[message.args[0]].route(message, currentPartie);
    //             }
    //
    //             // snif, on a le bon prefix mais aucune commande ne correspond :'(
    //             return this.botController.notFound(message);
    //
    //         }
    //
    //         // Le message ne commence pas par le prefix, on fait diverses actions du jeu (affectation de scenario, suite des étapes...)
    //         const currentPartie = await this.partieService.findCurrentOfDiscordGuild(curentDiscordGuild.id);
    //         if (currentPartie) {
    //             await this.partieService.fixNext(message, currentPartie);
    //         }
    //         return;
    //     } catch (e) {
    //         console.error('Route handler, une erreur a eu lieu : ', e);
    //     }
    // }
    //
    //
    // /**
    //  * On met les serveur en session pour éviter un aller retour en base à chaque message écrit sur discord
    //  * @param message
    //  * @private
    //  */
    // private async fetchCurrentDiscordGuild(message) {
    //
    //     if (!message.guild) {
    //         return null;
    //     }
    //
    //     // Serveur en session n'existe pas ou trop ancien ?
    //     if (!this.session[message.guild.id]
    //         || ((new Date().getTime()) - this.session[message.guild.id].time) > parseInt(process.env.SESSION_GUILD_TIME_LIMIT)) {
    //
    //         const discordGuild = await this.discordGuildRepository.findOne({where: {guildId: message.guild.id}});
    //
    //         if (!discordGuild) {
    //             // On ne fait rien :D
    //             console.log('On ne fait rien');
    //             return null;
    //         }
    //
    //         this.session[message.guild.id] = {
    //             time: new Date().getTime(),
    //             discordGuild
    //         };
    //     }
    //
    //     return await this.session[message.guild.id].discordGuild;
    // }
}
