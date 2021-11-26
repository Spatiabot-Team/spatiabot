import {EntityRepository, Repository} from "typeorm";
import {ScenarioEntity} from "../entities/scenario.entity";
import {ScenarioRepositoryInterface} from "../../../application/repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {ScenarioLightInterface} from "../../../domain/interfaces/scenario-light.interface";

@EntityRepository(ScenarioEntity)
export class ScenarioRepository extends Repository<ScenarioEntity> implements ScenarioRepositoryInterface {
    findOneById(id: number): Promise<ScenarioInterface> {
        return Promise.resolve(new ScenarioEntity());
    }

    async findAll(): Promise<ScenarioInterface[]> {
        return await this.find();
    }

    async findLightOfMonde(mondeId : string) : Promise<ScenarioLightInterface[]> {
        return this.find({
            select : ['id','titre','mondeId'],
            where : {
                mondeId
            }
        });
    }

}
