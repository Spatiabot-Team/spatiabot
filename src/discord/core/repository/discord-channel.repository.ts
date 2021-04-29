import {EntityRepository, Repository} from 'typeorm';
import {DiscordChannel} from "../entity/discord-channel.entity";

@EntityRepository(DiscordChannel)
export class DiscordChannelRepository extends Repository<DiscordChannel> {

}
