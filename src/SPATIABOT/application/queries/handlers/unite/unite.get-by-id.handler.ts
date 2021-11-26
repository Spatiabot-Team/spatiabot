import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UniteGetByIdQuery} from "../../impl/unite/unite.get-by-id.query";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Unite} from "../../../../domain/entities/unite";
import {UniteRepositoryInterface} from "../../../repositories/unite.repository.interface";

@QueryHandler(UniteGetByIdQuery)
export class UniteGetByIdHandler implements IQueryHandler<UniteGetByIdQuery> {

    constructor(@InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: UniteGetByIdQuery): Promise<Unite | null> {
        const uniteFound = await this.repository.findOne(query.id);
        if (!uniteFound) {
            return null;
        }
        return Object.assign(new Unite(), uniteFound);
    }
}
