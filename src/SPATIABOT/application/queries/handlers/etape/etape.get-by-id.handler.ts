import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {EtapeGetByIdQuery} from "../../impl/etape/etape.get-by-id.query";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Etape} from "../../../../domain/entities/etape";
import {EtapeRepositoryInterface} from "../../../repositories/etape.repository.interface";

@QueryHandler(EtapeGetByIdQuery)
export class EtapeGetByIdHandler implements IQueryHandler<EtapeGetByIdQuery> {

    constructor(@InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EtapeGetByIdQuery): Promise<Etape | null> {
        const etapeFound = await this.repository.findOne(query.id);
        if (!etapeFound) {
            return null;
        }
        return Object.assign(new Etape(), etapeFound);
    }
}
