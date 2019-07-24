import {EntityRepository, Repository} from "typeorm";
import {Scenario} from "../entity/scenario.entity";

@EntityRepository(Scenario)
export class ScenarioRepository extends Repository<Scenario> {

}
