import {EntityRepository, Repository} from 'typeorm';
import {SocialDiscord} from "../entity/social-discord.entity";

@EntityRepository(SocialDiscord)
export class SocialDiscordRepository extends Repository<SocialDiscord> {

    constructor() {
        super();
    }

    findByDiscordId(discordId: string) {
        return this.findOne({where: {discordId}});
    }
}
