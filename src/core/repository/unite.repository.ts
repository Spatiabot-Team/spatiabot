import {EntityRepository, Repository} from "typeorm";
import {Unite} from "../entity/unite.entity";

@EntityRepository(Unite)
export class UniteRepository extends Repository<Unite> {



}
