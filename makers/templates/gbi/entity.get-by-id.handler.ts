import {###Entity###GetByIdQuery} from "./###entity-tiret###/###entity-tiret###.get-by-id.query";
import {###Entity###Repository} from "../../../infrastructure/database/repositories/###entity-tiret###.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {###Entity###} from "../../../domain/entities/###entity-tiret###";
import {###Entity###RepositoryInterface} from "../../repositories/###entity-tiret###.repository.interface";

export class ###Entity###GetByIdHandler {

    constructor(@InjectRepository(###Entity###Repository) private readonly repository: ###Entity###RepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ###Entity###GetByIdQuery): Promise<###Entity### | null> {
        const ###entityCase###Found = await this.repository.findOne(query.id);
        if (!###entityCase###Found) {
            return null;
        }
        return Object.assign(new ###Entity###(), ###entityCase###Found);
    }
}
