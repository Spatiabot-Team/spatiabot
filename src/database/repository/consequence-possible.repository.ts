import {EntityRepository, Repository} from "typeorm";
import {ConsequencePossible} from "../entity/consequence-possible.entity";

@EntityRepository(ConsequencePossible)
export class ConsequencePossibleRepository extends Repository<ConsequencePossible> {

}
