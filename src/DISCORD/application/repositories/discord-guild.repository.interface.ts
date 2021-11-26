import {DiscordGuildInterface} from "../../domain/interfaces/discord-guild.interface";

export interface DiscordGuildRepositoryInterface {
    findOneById(id: number): Promise<DiscordGuildInterface>;
    findOneByDiscordGuildId(discordGuildId: string): Promise<DiscordGuildInterface>;
    findAll(): Promise<DiscordGuildInterface[]>;
    createDiscordGuild(discordGuild : DiscordGuildInterface) : Promise<DiscordGuildInterface>;
}
