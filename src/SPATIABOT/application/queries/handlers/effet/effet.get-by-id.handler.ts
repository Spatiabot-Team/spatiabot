import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {EffetGetByIdQuery} from "../../impl/effet/effet.get-by-id.query";
import {EffetRepository} from "../../../../infrastructure/database/repositories/effet.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Effet} from "../../../../domain/entities/effet";
import {EffetRepositoryInterface} from "../../../repositories/effet.repository.interface";

@QueryHandler(EffetGetByIdQuery)
export class EffetGetByIdHandler implements IQueryHandler<EffetGetByIdQuery> {

    constructor(@InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EffetGetByIdQuery): Promise<Effet | null> {
        const EffetFound = await this.repository.findOne(query.id);
        if (!EffetFound) {
            return null;
        }
        return Object.assign(new Effet(), EffetFound);
    }
}
