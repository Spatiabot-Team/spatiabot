import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {ConsequencePossibleRepositoryInterface} from "../../../repositories/consequence-possible.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossibleRepository} from "../../../../infrastructure/database/repositories/consequence-possible.repository";
import {ConsequencePossibleGetQuery} from "../../impl/consequence-possible/consequence-possible.get.query";

@QueryHandler(ConsequencePossibleGetQuery)
export class ConsequencePossibleGetHandler implements IQueryHandler<ConsequencePossibleGetQuery> {

    constructor(@InjectRepository(ConsequencePossibleRepository) private readonly repository: ConsequencePossibleRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ConsequencePossibleGetQuery) {
        console.log(clc.yellowBright('Async GetConsequencePossiblesQuery...'));
        return this.repository.findAll();
    }
}
