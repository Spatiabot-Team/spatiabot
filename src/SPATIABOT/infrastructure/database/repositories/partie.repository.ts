import {EntityRepository, Repository} from "typeorm";
import {PartieRepositoryInterface} from "../../../application/repositories/partie.repository.interface";
import {PartieInterface} from "../../../domain/interfaces/partie.interface";
import {PartieEntity} from "../entities/partie.entity";
import {Partie} from "../../../domain/entities/partie";

@EntityRepository(PartieEntity)
export class PartieRepository extends Repository<PartieEntity> implements PartieRepositoryInterface {
    findOneById(id: string): Promise<PartieInterface> {
        return this.findOne(id);
    }

    async findAll(): Promise<PartieInterface[]> {
        return await this.find();
    }

    findOneByDiscordUuid(uuid: string): Promise<Partie> {
        return this.findOne({
            where : {
                discordGuildUuid : uuid
            }
        })
    }

}
