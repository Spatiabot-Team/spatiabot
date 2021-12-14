import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../../../infrastructure/database/repositories/partie.repository";
import {PartieRepositoryInterface} from "../../../repositories/partie.repository.interface";
import {PartieGetByDiscordGuildQuery} from "../../impl/partie/partie.get-by-discord-guild.query";
import {PartieFindQuery} from "../../impl/partie/partie.find.query";

@QueryHandler(PartieFindQuery)
export class PartieFindHandler implements IQueryHandler<PartieFindQuery> {

    constructor(@InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: PartieFindQuery) {
        return await this.repository.find({
            mondeId : query.mondeId,
            discordGuildUuid : query.discordGuildUuid
        });
    }
}
