import {EntityRepository, Repository} from "typeorm";
import {Monde} from "../entity/monde.entity";

@EntityRepository(Monde)
export class MondeRepository extends Repository<Monde> {




}
