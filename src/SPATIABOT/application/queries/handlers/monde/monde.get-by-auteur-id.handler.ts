import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {MondeGetByAuteurIdQuery} from "../../impl/monde/monde.get-by-auteur-id.query";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";

@QueryHandler(MondeGetByAuteurIdQuery)
export class MondeGetByAuteurIdHandler implements IQueryHandler<MondeGetByAuteurIdQuery> {

    constructor(@InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: MondeGetByAuteurIdQuery):  Promise<MondeInterface[]> {
        return await this.repository.findAllByAuteurId(query.authorId);
    }
}
