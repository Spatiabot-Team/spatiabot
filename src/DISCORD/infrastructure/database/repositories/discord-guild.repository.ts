import {EntityRepository, Repository} from "typeorm";
import {DiscordGuildEntity} from "../entities/discord-guild.entity";
import {DiscordGuildRepositoryInterface} from "../../../application/repositories/discord-guild.repository.interface";
import {DiscordGuildInterface} from "../../../domain/interfaces/discord-guild.interface";

@EntityRepository(DiscordGuildEntity)
export class DiscordGuildRepository extends Repository<DiscordGuildEntity> implements DiscordGuildRepositoryInterface {

    findOneById(id: number): Promise<DiscordGuildInterface> {
        return this.findOne(id);
    }

    async findAll(): Promise<DiscordGuildInterface[]> {
        return this.find();
    }

    async findOneByDiscordGuildId(discordGuildId: string): Promise<DiscordGuildInterface> {

        return this.findOne({
            where: {
                discordGuildId
            }
        });
    }

    createDiscordGuild(discordGuild : DiscordGuildInterface) : Promise<DiscordGuildInterface>{
        return this.save(discordGuild);
    }

}
