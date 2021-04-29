import {Injectable} from "@nestjs/common";
import {VaisseauController} from "../controller-bot/vaisseau.controller";
import {BotController} from "../controller-bot/bot.controller";
import {AdminController} from "../controller-bot/admin.controller";
import {RouteTypeEnum} from "../enums/route-type.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordService} from "../../discord/core/service/discord.service";
import {PartieService} from "../core/service/partie.service";
import {Partie} from "../core/entity/partie.entity";
import {EmbedService} from "../../discord/core/service/embed.service";
import {DiscordGuildRepository} from "../../discord/core/repository/discord-guild.repository";
import {JoueurRepository} from "../core/repository/joueur.repository";

@Injectable()
export class RouteListener {

    prefix: string;

    session: {};

    ROUTES = {
        'creer-partie': {type: RouteTypeEnum.ADMIN, route: (message) => this.adminController.creerPartie(message)},
        'decollage': {
            type: RouteTypeEnum.PARTIE,
            route: (message, partie) => this.vaisseauController.decollage(message, partie)
        },
        'd': {
            type: RouteTypeEnum.PARTIE,
            route: (message, partie) => this.vaisseauController.decollage(message, partie)
        },
        'reponse': {
            type: RouteTypeEnum.PARTIE,
            route: (message, partie) => this.vaisseauController.reponse(message, partie)
        },
        'r': {type: RouteTypeEnum.PARTIE, route: (message, partie) => this.vaisseauController.reponse(message, partie)}
    }

    constructor(
        private readonly discordService: DiscordService,
        private readonly partieService: PartieService,
        private readonly embedService: EmbedService,
        private readonly adminController: AdminController,
        private readonly vaisseauController: VaisseauController,
        private readonly botController: BotController,
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository,
        @InjectRepository(JoueurRepository) private readonly joueurRepository: JoueurRepository
    ) {
        this.prefix = process.env.BOT_PREFIX || "!";
        this.discordService.addEvent("message", (message) => this.handler(message));
        this.session = [];
    }

    async handler(message) {
        let curentDiscordGuild = null;

        if (message.channel.type === "dm") {

            // Trouver dans quelle partie il est joueur
            const joueurs = await this.joueurRepository.findByDiscordUserId(message.author.id)
            if (joueurs.length === 0) {
                console.log('Joueur non trouvé en dm');
                return;
            }
            // On prend la première partie par facilité
            // @todo pousser l'analyse pour savoir à quelle partie/serveur fait référence l'author
            // pour l'instant on joue sur le fait qu'un user n'utilise le bot que sur un serveur
            curentDiscordGuild = joueurs[0].partie.discordGuild;
        } else {
            curentDiscordGuild = await this.fetchCurrentDiscordGuild(message);
        }

        if (!curentDiscordGuild) {
            // Pas de serveur trouvé, on ne fait rien !
            return;
        }

        // Ca commence par le préfix ?
        if (message.content.startsWith(curentDiscordGuild.prefix)) {

            // On récupère la commande et les arguments (ce qui suit derière le préfixe)
            //@todo améliorer le trim split pour gérer des guillements (groupe de mots)
            message.content = message.content.replace(this.prefix, "");
            message.args = message.content.trim().split(/ +/g); // [0:commande, 1:argument1 2: argument2]

            // La commande existe ?
            if (this.ROUTES[message.args[0]] !== undefined) {

                // Commande Admin ?
                if (this.ROUTES[message.args[0]].type === RouteTypeEnum.ADMIN) {
                    return this.ROUTES[message.args[0]].route(message);
                }

                // Pour une commande de type partie, on vérifie qu'il y ait une partie en cours
                const currentPartie = await this.partieService.findCurrentOfDiscordGuild(curentDiscordGuild.id);

                if (!currentPartie) {
                    // dsl mais il n'y a pas de partie en cours :( (demande à ton admin ! :p)
                    return this.botController.noGameInProgress(message);
                }

                return this.ROUTES[message.args[0]].route(message, currentPartie);
            }

            // snif, on a le bon prefix mais aucune commande ne correspond :'(
            return this.botController.notFound(message);

        }

        // Le message ne commence pas par le prefix, on fait diverses actions du jeu (affectation de scenario, suite des étapes...)
        const currentPartie = await this.partieService.findCurrentOfDiscordGuild(curentDiscordGuild.id);
        if (currentPartie) {
            await this.partieService.fixNext(message, currentPartie);
        }
        return;
    }


    /**
     * On met les serveur en session pour éviter un aller retour en base à chaque message écrit sur discord
     * @param message
     * @private
     */
    private async fetchCurrentDiscordGuild(message) {

        if (!message.guild) {
            return null;
        }

        // Serveur en session n'existe pas ou trop ancien ?
        if (!this.session[message.guild.id]
            || ((new Date().getTime()) - this.session[message.guild.id].time) > parseInt(process.env.SESSION_GUILD_TIME_LIMIT)) {

            const discordGuild = await this.discordGuildRepository.findOne({where: {guildId: message.guild.id}});

            if (!discordGuild) {
                // On ne fait rien :D
                console.log('On ne fait rien');
                return null;
            }

            this.session[message.guild.id] = {
                time: new Date().getTime(),
                discordGuild
            };
        }

        return await this.session[message.guild.id].discordGuild;
    }
}
