import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../../infrastructure/database/repositories/partie.repository";
import {PartieRepositoryInterface} from "../../repositories/partie.repository.interface";
import {PartieGetByDiscordGuildQuery} from "./partie.get-by-discord-guild.query";

export class PartieGetByDiscordGuildHandler {

    constructor(@InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: PartieGetByDiscordGuildQuery) {
        return await this.repository.findOneByDiscordUuid(query.discordGuildUuid);
    }
}
