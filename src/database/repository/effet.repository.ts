import {EntityRepository, Repository} from "typeorm";
import {Effet} from "../entity/effet.entity";
import {ConsequencePossible} from "../entity/consequence-possible.entity";

@EntityRepository(Effet)
export class EffetRepository extends Repository<Effet> {

}
