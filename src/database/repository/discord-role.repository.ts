import {EntityRepository, Repository} from 'typeorm';
import {DiscordRole} from "../entity/discord-role.entity";

@EntityRepository(DiscordRole)
export class DiscordRoleRepository extends Repository<DiscordRole> {
}
