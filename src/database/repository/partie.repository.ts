import {EntityRepository, Repository} from "typeorm";
import {Partie} from "../entity/partie.entity";

@EntityRepository(Partie)
export class PartieRepository extends Repository<Partie> {

}
