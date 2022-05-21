import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {Cache} from 'cache-manager';
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../../../infrastructure/database/repositories/discord-guild.repository";
import {DiscordGuildRepositoryInterface} from "../../repositories/discord-guild.repository.interface";
import {CacheKeys} from "../../../infrastructure/cache/cache-keys";

@Injectable()
export class DiscordGuildFindByDiscordGuildIdService {

    private discordGuildRepository: DiscordGuildRepositoryInterface;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly queryBus: QueryBus,
        @InjectRepository(DiscordGuildRepository) discordGuildRepository: DiscordGuildRepositoryInterface
    ) {
        this.discordGuildRepository = discordGuildRepository;
    }

    async execute(discordGuildUuid) {
        let discordGuilds = await this.cacheManager.get(CacheKeys.DISCORD_GUILDS);

        // Si disocrdGuilds n'existe pas en cache on doit initialiser le cache
        if (!discordGuilds) {
            discordGuilds = {};

            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, {}, {ttl: process.env.CACHE_DURATION_DISCORD_GUILDS || 360000});
        }

        // Maintenant on peut vérifier que notre guild est ou non en cache
        if (!discordGuilds[discordGuildUuid]) {

            const discordGuildFound =  await this.discordGuildRepository.findOneById(discordGuildUuid);
            if(!discordGuildFound){
                return null;
            }

            discordGuilds[discordGuildUuid] = discordGuildFound;
            await this.cacheManager.set(CacheKeys.DISCORD_GUILDS, discordGuilds);
        }

        return discordGuilds[discordGuildUuid];
    }

}
