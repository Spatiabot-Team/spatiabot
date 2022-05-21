import * as clc from 'cli-color';
import {EtapeRepositoryInterface} from "../../repositories/etape.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepository} from "../../../infrastructure/database/repositories/etape.repository";
import {EtapeGetQuery} from "./etape.get.query";

export class EtapeGetHandler {

    constructor(@InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EtapeGetQuery) {
        console.log(clc.yellowBright('Async GetEtapesQuery...'));
        return this.repository.findAll();
    }
}
