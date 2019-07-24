import {EntityRepository, Repository} from "typeorm";
import {Etape} from "../entity/etape.entity";
import {Scenario} from "../entity/scenario.entity";

@EntityRepository(Etape)
export class EtapeRepository extends Repository<Etape> {

}
