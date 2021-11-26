import {EntityRepository, Repository} from "typeorm";
import {SocialDiscordRepositoryInterface} from "../../../application/repositories/social-discord.repository.interface";
import {SocialDiscordEntity} from "../entities/social-discord.entity";
import {UserInterface} from "../../../domain/interfaces/user.interface";

@EntityRepository(SocialDiscordEntity)
export class SocialDiscordRepository extends Repository<SocialDiscordEntity> implements SocialDiscordRepositoryInterface {

    async createSocialDiscord(user : UserInterface){
        return this.save(user);
    }

    async findUserByDiscordId(discordId: string) : Promise<UserInterface | undefined> {
        const socialDiscordEntity = await this.findOne({
            where : {
                discordId
            }
        });

        if(!socialDiscordEntity){
            return undefined;
        }

        return socialDiscordEntity.user;
    }
}
