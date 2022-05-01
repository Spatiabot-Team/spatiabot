import {EntityRepository, Repository} from "typeorm";
import {
    ConsequencePossibleRepositoryInterface
} from "../../../application/repositories/consequence-possible.repository.interface";
import {ConsequencePossibleInterface} from "../../../domain/interfaces/consequence-possible.interface";
import {ConsequencePossibleEntity} from "../entities/consequence-possible.entity";

@EntityRepository(ConsequencePossibleEntity)
export class ConsequencePossibleRepository extends Repository<ConsequencePossibleEntity> implements ConsequencePossibleRepositoryInterface {
    findOneById(id: number): Promise<ConsequencePossibleInterface> {
        return Promise.resolve(new ConsequencePossibleEntity());
    }

    async findAll(): Promise<ConsequencePossibleInterface[]> {
        return await this.find();
    }
}
