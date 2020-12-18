import {EntityRepository, Repository} from "typeorm";
import {Stat} from "../entity/stat.entity";
import {ConsequencePossible} from "../entity/consequence-possible.entity";

@EntityRepository(Stat)
export class StatRepository extends Repository<Stat> {

}
