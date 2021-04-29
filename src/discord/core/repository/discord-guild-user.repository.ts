import {EntityRepository, Repository} from 'typeorm';
import {DiscordGuildUser} from "../entity/discord-guild-user.entity";

@EntityRepository(DiscordGuildUser)
export class DiscordGuildUserRepository extends Repository<DiscordGuildUser> {
}
