import {EntityRepository, Repository} from "typeorm";
import {DiscordGuildUserRepositoryInterface} from "../../../application/repositories/discord-guild-user.repository.interface";
import {DiscordGuildUserInterface} from "../../../domain/interfaces/discord-guild-user.interface";
import {DiscordGuildUserEntity} from "../entities/discord-guild-user.entity";

@EntityRepository(DiscordGuildUserEntity)
export class DiscordGuildUserRepository extends Repository<DiscordGuildUserEntity> implements DiscordGuildUserRepositoryInterface {
    findOneById(id: number): Promise<DiscordGuildUserInterface> {
        return Promise.resolve(new DiscordGuildUserEntity());
    }

    async findAll(): Promise<DiscordGuildUserInterface[]> {
        return await this.find();
    }
}
