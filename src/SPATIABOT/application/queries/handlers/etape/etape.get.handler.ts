import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {EtapeRepositoryInterface} from "../../../repositories/etape.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {EtapeGetQuery} from "../../impl/etape/etape.get.query";

@QueryHandler(EtapeGetQuery)
export class EtapeGetHandler implements IQueryHandler<EtapeGetQuery> {

    constructor(@InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EtapeGetQuery) {
        console.log(clc.yellowBright('Async GetEtapesQuery...'));
        return this.repository.findAll();
    }
}
