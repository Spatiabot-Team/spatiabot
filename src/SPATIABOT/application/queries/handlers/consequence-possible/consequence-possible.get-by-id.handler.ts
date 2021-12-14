import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {ConsequencePossibleGetByIdQuery} from "../../impl/consequence-possible/consequence-possible.get-by-id.query";
import {ConsequencePossibleRepository} from "../../../../infrastructure/database/repositories/consequence-possible.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossible} from "../../../../domain/entities/consequence-possible";
import {ConsequencePossibleRepositoryInterface} from "../../../repositories/consequence-possible.repository.interface";

@QueryHandler(ConsequencePossibleGetByIdQuery)
export class ConsequencePossibleGetByIdHandler implements IQueryHandler<ConsequencePossibleGetByIdQuery> {

    constructor(@InjectRepository(ConsequencePossibleRepository) private readonly repository: ConsequencePossibleRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ConsequencePossibleGetByIdQuery): Promise<ConsequencePossible | null> {
        const ConsequencepossibleFound = await this.repository.findOne(query.id);
        if (!ConsequencepossibleFound) {
            return null;
        }
        return Object.assign(new ConsequencePossible(), ConsequencepossibleFound);
    }
}
