import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../../../infrastructure/database/repositories/partie.repository";
import {PartieRepositoryInterface} from "../../../repositories/partie.repository.interface";
import {PartieGetByDiscordGuildQuery} from "../../impl/partie/partie.get-by-discord-guild.query";

@QueryHandler(PartieGetByDiscordGuildQuery)
export class PartieGetByDiscordGuildHandler implements IQueryHandler<PartieGetByDiscordGuildQuery> {

    constructor(@InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: PartieGetByDiscordGuildQuery) {
        return await this.repository.findOneByDiscordUuid(query.discordGuildUuid);
    }
}
