import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import {###Entity###RepositoryInterface} from "../../../repositories/###entity-tiret###.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {###Entity###Repository} from "../../../../infrastructure/database/repositories/###entity-tiret###.repository";
import {###Entity###GetQuery} from "../../impl/###entity-tiret###/###entity-tiret###.get.query";

@QueryHandler(###Entity###GetQuery)
export class ###Entity###GetHandler implements IQueryHandler<###Entity###GetQuery> {

    constructor(@InjectRepository(###Entity###Repository) private readonly repository: ###Entity###RepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ###Entity###GetQuery) {
        console.log(clc.yellowBright('Async Get###Entity###sQuery...'));
        return this.repository.findAll();
    }
}
