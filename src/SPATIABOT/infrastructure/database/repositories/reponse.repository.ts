import {EntityRepository, Repository} from "typeorm";
import {ReponseRepositoryInterface} from "../../../application/repositories/reponse.repository.interface";
import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";
import {ReponseEntity} from "../entities/reponse.entity";

@EntityRepository(ReponseEntity)
export class ReponseRepository extends Repository<ReponseEntity> implements ReponseRepositoryInterface {
    findOneById(id: number): Promise<ReponseInterface> {
        return Promise.resolve(new ReponseEntity());
    }

    async findAll(): Promise<ReponseInterface[]> {
        return await this.find();
    }
}
