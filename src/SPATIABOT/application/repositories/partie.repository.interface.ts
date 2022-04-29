import {Repository} from "typeorm";
import {Partie} from "../../domain/entities/partie";
import {PartieInterface} from "../../domain/interfaces/partie.interface";

export interface PartieRepositoryInterface extends Repository<PartieInterface>{
    findOneById(id: string): Promise<Partie>;
    findOneByDiscordUuid(uuid: string): Promise<Partie>;
    findAll(): Promise<Partie[]>;
}
