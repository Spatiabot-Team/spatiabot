import {EntityRepository, In, Repository} from 'typeorm';
import {DiscordGuild} from "../entity/discord-guild.entity";

@EntityRepository(DiscordGuild)
export class DiscordGuildRepository extends Repository<DiscordGuild> {

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

        // @todo : On fait le filtre des champs à la main le temps de trouver comment le faire automatiquement (cf sanitization)
        // return discordGuilds.map(dg => ({
        //     id: dg.id,
        //     guildId: dg.guildId,
        //     name: dg.name,
        //     icon: dg.icon,
        //     discordGuildUsers: dg.discordGuildUsers.map(du => ({
        //             id: du.id,
        //             isOwner: du.isOwner,
        //             permissions: du.permissions,
        //             socialDiscord:du.socialDiscord
        //         })
        //     )
        // }));
    }

    // return this.createQueryBuilder("discordGuild")
    // .leftJoinAndSelect("discordGuild.discordGuildUsers", "discordGuildUsers")
    // .leftJoinAndSelect("discordGuildUsers.user", "user")
    // .where("discordGuild.guildId IN (:...guildIds)", {guildIds:guildIds})
    // // .select(["discordGuild.name"])
    // // .getSql();
    // .execute();

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
