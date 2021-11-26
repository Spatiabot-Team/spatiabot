import {EntityRepository, Repository} from "typeorm";
import {UniteRepositoryInterface} from "../../../application/repositories/unite.repository.interface";
import {UniteInterface} from "../../../domain/interfaces/unite.interface";
import {UniteEntity} from "../entities/unite.entity";

@EntityRepository(UniteEntity)
export class UniteRepository extends Repository<UniteEntity> implements UniteRepositoryInterface {
    findOneById(id: number): Promise<UniteInterface> {
        return Promise.resolve(new UniteEntity());
    }

    async findAll(): Promise<UniteInterface[]> {
        return await this.find();
    }
}
