import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioHasNotThisAuteurException} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioDoesntExistException} from "../../../../domain/exceptions/scenario/scenario-doesnt-exist.exception";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioGetByIdQuery} from "../../../queries/impl/scenario/scenario.get-by-id.query";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioDeleteCommand} from "../../impl/scenario/scenario.delete.command";

@CommandHandler(ScenarioDeleteCommand)
export class ScenarioDeleteHandler implements IQueryHandler<ScenarioDeleteCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un scenario s'il existe et si l'auteur est bien un auteur de ce scenario
     * @param query ScenarioDeleteCommand
     * @throws ScenarioDoesntExistException
     * @throws ScenarioHasNotThisAuteurException
     */
    async execute(query: ScenarioDeleteCommand): Promise<ScenarioInterface> {

        const scenarioFound = await this.queryBus.execute(new ScenarioGetByIdQuery(query.scenarioId));

        if (!scenarioFound) {
            throw new ScenarioDoesntExistException();
        }

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }

        return this.repository.delete(query.scenarioId);
    }
}
