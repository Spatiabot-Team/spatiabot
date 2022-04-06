
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossibleRepositoryInterface} from "../../repositories/consequence-possible.repository.interface";
import {ConsequencePossible} from "../../../domain/entities/consequence-possible";
import {ConsequencePossibleGetByIdQuery} from "./consequence-possible.get-by-id.query";
import {
    ConsequencePossibleRepository
} from "../../../infrastructure/database/repositories/consequence-possible.repository";

export class ConsequencePossibleGetByIdHandler {

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
