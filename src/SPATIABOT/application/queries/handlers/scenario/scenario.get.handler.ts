import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioGetQuery} from "../../impl/scenario/scenario.get.query";

@QueryHandler(ScenarioGetQuery)
export class ScenarioGetHandler implements IQueryHandler<ScenarioGetQuery> {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ScenarioGetQuery) {
        console.log(clc.yellowBright('Async GetScenariosQuery...'));
        return this.repository.findAll();
    }
}
