import {EntityRepository, Repository} from "typeorm";
import {EtapeRepositoryInterface} from "../../../application/repositories/etape.repository.interface";
import {EtapeInterface} from "../../../domain/interfaces/etape.interface";
import {EtapeEntity} from "../entities/etape.entity";

@EntityRepository(EtapeEntity)
export class EtapeRepository extends Repository<EtapeEntity> implements EtapeRepositoryInterface {
    findOneById(id: number): Promise<EtapeInterface> {
        return Promise.resolve(new EtapeEntity());
    }

    async findAll(): Promise<EtapeInterface[]> {
        return await this.find();
    }
}
