import {EntityRepository, In, Repository} from 'typeorm';
import {DiscordGuild} from "../entity/discord-guild.entity";
import {DiscordGuildUserRepository} from "./discord-guild-user.repository";
import {InjectRepository} from "@nestjs/typeorm";

@EntityRepository(DiscordGuild)
export class DiscordGuildRepository extends Repository<DiscordGuild> {

    constructor(
        @InjectRepository(DiscordGuildUserRepository) private readonly discordGuildUserRepository: DiscordGuildUserRepository
    ) {
        super();
    }

    findByGuildIds(guildIds) {
        return this.find({
            where: {guildId: In(guildIds)}
        });
    }

    async findByDiscordId(discordId) {
        const discordGuilds = await this.find({
            where: qb => {
                qb.where('DiscordGuild_discordGuildUsers_socialDiscord.discordId = :discordId', {discordId})
            }
        });
        return discordGuilds;
    }

    async findByDiscordUserJoueur(discordId) {
        return await this.find({
            where: qb => {
                qb.where('DiscordGuild_parties_joueurs_user_socialDiscord.discordId = :discordId AND DiscordGuild_parties.actif = :actif', {
                    discordId, actif: true
                })
            }
        });
    }


}
