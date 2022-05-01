import {Repository} from "typeorm";
import {DiscordGuildUserInterface} from "../../domain/interfaces/discord-guild-user.interface";

export interface DiscordGuildUserRepositoryInterface extends Repository<DiscordGuildUserInterface>{
    findOne(options : any) : Promise<DiscordGuildUserInterface>;
    findOneById(id: number): Promise<DiscordGuildUserInterface>;
    findAll(): Promise<DiscordGuildUserInterface[]>;
}
