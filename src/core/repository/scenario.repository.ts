import {EntityRepository, Repository} from "typeorm";
import {Scenario} from "../entity/scenario.entity";

@EntityRepository(Scenario)
export class ScenarioRepository extends Repository<Scenario> {
    findByUuid(uuid): Scenario {
        return Object.assign(new Scenario(), this.find({where: {"id::text": uuid}}));
    }
}
