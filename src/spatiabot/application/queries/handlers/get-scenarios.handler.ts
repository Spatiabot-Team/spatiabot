import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {GetScenariosQuery} from '../impl';
import {ScenarioRepositoryItf} from "../../repositories/scenario.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";

@QueryHandler(GetScenariosQuery)
export class GetScenariosHandler implements IQueryHandler<GetScenariosQuery> {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryItf) {
        this.repository = repository;
    }

    async execute(query: GetScenariosQuery) {
        console.log(clc.yellowBright('Async GetScenariosQuery...'));
        return this.repository.findAll();
    }
}
