import {EntityRepository, Repository} from "typeorm";
import {Scenario} from "../entities/scenario.entity";
import {ScenarioRepositoryItf} from "../../../application/repositories/scenario.repository.interface";
import {ScenarioItf} from "../../../domain/interfaces/scenario.interface";

@EntityRepository(Scenario)
export class ScenarioRepository extends Repository<Scenario> implements ScenarioRepositoryItf{
    findOneById(id: number): Promise<ScenarioItf>{
        return Promise.resolve(new Scenario());
    }
    async findAll(): Promise<ScenarioItf[]>{
        return await this.find();
    }
}
