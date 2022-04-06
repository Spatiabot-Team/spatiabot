import {EntityRepository, Repository} from "typeorm";
import {###Entity###RepositoryInterface} from "../../../application/repositories/###entity-tiret###.repository.interface";
import {###Entity###Interface} from "../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###Entity} from "../entities/###entity-tiret###.entity";

@EntityRepository(###Entity###Entity)
export class ###Entity###Repository extends Repository<###Entity###Entity> implements ###Entity###RepositoryInterface {
    findOneById(id: number): Promise<###Entity###Interface> {
        return Promise.resolve(new ###Entity###Entity());
    }

    async findAll(): Promise<###Entity###Interface[]> {
        return await this.find();
    }
}
