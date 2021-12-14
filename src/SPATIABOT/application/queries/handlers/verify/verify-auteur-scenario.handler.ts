import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Unite} from "../../../../domain/entities/unite";
import {UniteRepositoryInterface} from "../../../repositories/unite.repository.interface";
import {VerifyAuteurScenarioQuery} from "../../impl/verify/verify.auteur-scenario.query";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";

@QueryHandler(VerifyAuteurScenarioQuery)
export class VerifyAuteurScenarioHandler implements IQueryHandler<VerifyAuteurScenarioQuery> {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: VerifyAuteurScenarioQuery): Promise<boolean> {
        return true;
    }
}
