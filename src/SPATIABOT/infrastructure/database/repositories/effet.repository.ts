import {EntityRepository, Repository} from "typeorm";
import {EffetRepositoryInterface} from "../../../application/repositories/effet.repository.interface";
import {EffetInterface} from "../../../domain/interfaces/effet.interface";
import {EffetEntity} from "../entities/effet.entity";

@EntityRepository(EffetEntity)
export class EffetRepository extends Repository<EffetEntity> implements EffetRepositoryInterface {
    findOneById(id: number): Promise<EffetInterface> {
        return Promise.resolve(new EffetEntity());
    }

    async findAll(): Promise<EffetInterface[]> {
        return await this.find();
    }
}
