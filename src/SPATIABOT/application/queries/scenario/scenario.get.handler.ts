import * as clc from 'cli-color';
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioGetQuery} from "./scenario.get.query";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";

export class ScenarioGetHandler {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ScenarioGetQuery) {
        console.log(clc.yellowBright('Async GetScenariosQuery...'));
        return this.repository.findAll();
    }
}
