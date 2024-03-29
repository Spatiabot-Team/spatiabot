import {EntityRepository, Raw, Repository} from "typeorm";
import {MondeRepositoryInterface} from "../../../application/repositories/monde.repository.interface";
import {MondeEntity} from "../entities/monde.entity";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";

@EntityRepository(MondeEntity)
export class MondeRepository extends Repository<MondeEntity> implements MondeRepositoryInterface {

    async findAllByAuteurId(id: string): Promise<MondeInterface[]> {

        return this.find({
            select: ['id', 'nom', 'slug', 'code', 'auteurIds'],
            where: {
                auteurIds: Raw(aliasColumn => `:id = any(${aliasColumn})`, {id})
            }
        });
    }
}
