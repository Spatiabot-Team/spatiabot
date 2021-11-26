import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";
import {DiscordGuild} from "../../../../DISCORD/domain/entities/discord-guild.entity";
import {Partie} from "../../../domain/entities/partie";
import {CacheKeys} from "../../cache/cache-keys";
import {PartieNotFoundException} from "../../../domain/exceptions/partie-not-found.exception";
import {QueryBus} from "@nestjs/cqrs";
import {Cache} from 'cache-manager';
import {PartieGetByDiscordGuildQuery} from "../../../application/queries/impl/partie/partie.get-by-discord-guild.query";

@Injectable()
export class PartieService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly queryBus: QueryBus
    ) {
    }

    /**
     * Cherche l'objet partie correspondant à la discord guilde en cache, si non trouvé le cherche en base
     * si toujours pas trouvé le créer et l'ajoute au cache
     * @param discordGuild
     * @private
     */
    async findPartie(discordGuild: DiscordGuild): Promise<Partie> {

        let parties = await this.cacheManager.get(CacheKeys.PARTIES);

        if (!parties) {
            parties = {};
            await this.cacheManager.set(CacheKeys.PARTIES, {}, {ttl: process.env.CACHE_DURATION_PARTIES || 360000});
        }

        if (!parties[discordGuild.id]) {
            parties[discordGuild.id] = await this.findPartiesInDb(discordGuild);
            await this.cacheManager.set('discord-guilds', parties);
        }

        return parties[discordGuild.id];
    }

    /**
     *
     * @param discordGuild
     * @private
     */
    private async findPartiesInDb(discordGuild: DiscordGuild): Promise<Partie> {

        let partie = await this.queryBus.execute(new PartieGetByDiscordGuildQuery(discordGuild.id));
        console.log(partie);
        if (!partie) {
            throw new PartieNotFoundException()
        }
        return partie;
    }

}
