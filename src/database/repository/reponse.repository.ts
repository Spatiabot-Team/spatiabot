import {EntityRepository, Repository} from "typeorm";
import {Reponse} from "../entity/reponse.entity";
import {Etape} from "../entity/etape.entity";

@EntityRepository(Reponse)
export class ReponseRepository extends Repository<Reponse> {

}
