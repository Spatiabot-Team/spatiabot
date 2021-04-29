import {EntityRepository, Repository} from "typeorm";
import {ScenarioEffectue} from "../entity/scenario-effectue.entity";

@EntityRepository(ScenarioEffectue)
export class ScenarioEffectueRepository extends Repository<ScenarioEffectue> {
}
