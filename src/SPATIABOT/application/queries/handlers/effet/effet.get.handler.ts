import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {EffetRepositoryInterface} from "../../../repositories/effet.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {EffetRepository} from "../../../../infrastructure/database/repositories/effet.repository";
import {EffetGetQuery} from "../../impl/effet/effet.get.query";

@QueryHandler(EffetGetQuery)
export class EffetGetHandler implements IQueryHandler<EffetGetQuery> {

    constructor(@InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EffetGetQuery) {
        console.log(clc.yellowBright('Async GetEffetsQuery...'));
        return this.repository.findAll();
    }
}
