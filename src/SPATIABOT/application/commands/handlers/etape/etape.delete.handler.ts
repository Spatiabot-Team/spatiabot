import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeDeleteCommand} from "../../impl/etape/etape.delete.command";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {EtapeRepositoryInterface} from "../../../repositories/etape.repository.interface";
import {ScenarioGetByIdQuery} from "../../../queries/impl/scenario/scenario.get-by-id.query";
import {ScenarioHasNotThisAuteurException} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {EtapeNotFoundException} from "../../../../domain/exceptions/etape/etape-not-found.exception";
import {EtapeGetByIdQuery} from "../../../queries/impl/etape/etape.get-by-id.query";

@CommandHandler(EtapeDeleteCommand)
export class EtapeDeleteHandler implements IQueryHandler<EtapeDeleteCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un etape s'il existe et si l'auteur est bien un auteur de ce etape
     * @param query EtapeDeleteCommand
     * @throws EtapeNotFoundException
     * @throws EtapeHasNotThisAuteurException
     */
    async execute(query: EtapeDeleteCommand): Promise<EtapeInterface> {

        const etapeFound = await this.queryBus.execute(new EtapeGetByIdQuery(query.etapeId));

        if (!etapeFound) {
            throw new EtapeNotFoundException();
        }

        const scenarioFound = await this.queryBus.execute(new ScenarioGetByIdQuery(etapeFound.scenarioId));

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }

        return this.repository.delete(query.etapeId);
    }
}
