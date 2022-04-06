import {EntityRepository, Repository} from "typeorm";
import {StatEntity} from "../entities/stat.entity";
import {StatRepositoryInterface} from "../../../application/repositories/stat.repository.interface";

@EntityRepository(StatEntity)
export class StatRepository extends Repository<StatEntity> implements StatRepositoryInterface {

}
