import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {ReponseGetByIdQuery} from "../../impl/reponse/reponse.get-by-id.query";
import {ReponseRepository} from "../../../../infrastructure/database/repositories/reponse.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Reponse} from "../../../../domain/entities/reponse";
import {ReponseRepositoryInterface} from "../../../repositories/reponse.repository.interface";

@QueryHandler(ReponseGetByIdQuery)
export class ReponseGetByIdHandler implements IQueryHandler<ReponseGetByIdQuery> {

    constructor(@InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ReponseGetByIdQuery): Promise<Reponse | null> {
        const ReponseFound = await this.repository.findOne(query.id);
        if (!ReponseFound) {
            return null;
        }
        return Object.assign(new Reponse(), ReponseFound);
    }
}
