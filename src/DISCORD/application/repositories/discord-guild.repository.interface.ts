import {DiscordGuildInterface} from "../../domain/interfaces/discord-guild.interface";
import {Repository} from "typeorm/repository/Repository";

export interface DiscordGuildRepositoryInterface extends Repository<DiscordGuildInterface> {
    findOneById(id: number): Promise<DiscordGuildInterface>;

    findOneByDiscordGuildId(discordGuildId: string): Promise<DiscordGuildInterface>;

    findAll(): Promise<DiscordGuildInterface[]>;

    createDiscordGuild(discordGuild: DiscordGuildInterface): Promise<DiscordGuildInterface>;
}
