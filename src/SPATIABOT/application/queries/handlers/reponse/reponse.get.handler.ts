import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {ReponseRepositoryInterface} from "../../../repositories/reponse.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {ReponseRepository} from "../../../../infrastructure/database/repositories/reponse.repository";
import {ReponseGetQuery} from "../../impl/reponse/reponse.get.query";

@QueryHandler(ReponseGetQuery)
export class ReponseGetHandler implements IQueryHandler<ReponseGetQuery> {

    constructor(@InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ReponseGetQuery) {
        console.log(clc.yellowBright('Async GetReponsesQuery...'));
        return this.repository.findAll();
    }
}
