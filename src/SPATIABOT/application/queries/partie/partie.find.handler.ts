import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepositoryInterface} from "../../repositories/partie.repository.interface";
import {PartieRepository} from "../../../infrastructure/database/repositories/partie.repository";
import {PartieFindQuery} from "./partie.find.query";


export class PartieFindHandler {

    constructor(@InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: PartieFindQuery) {
            return await this.repository.find({
                mondeId : query.mondeId,
                discordGuildUuid : query.discordGuildUuid,
                actif : true
            });

    }
}
