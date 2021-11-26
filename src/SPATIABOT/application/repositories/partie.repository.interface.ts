import {Partie} from "../../domain/entities/partie";

export interface PartieRepositoryInterface {
    findOneById(id: string): Promise<Partie>;
    findOneByDiscordUuid(uuid: string): Promise<Partie>;
    findAll(): Promise<Partie[]>;
}
