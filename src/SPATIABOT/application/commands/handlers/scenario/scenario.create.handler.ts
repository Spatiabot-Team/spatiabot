import {ScenarioCreateCommand} from "../../impl/scenario/scenario.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeFindQuery} from "../../../queries/impl/monde/monde.find.query";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";


@CommandHandler(ScenarioCreateCommand)
export class ScenarioCreateHandler implements IQueryHandler<ScenarioCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Créer un monde, et ça, c'est beau.
     * @param query MondeCreateCommand
     * @throws MondeAlreadyExistsException
     */
    async execute(query: ScenarioCreateCommand): Promise<ScenarioInterface> {

        const mondeFound = await this.queryBus.execute(new MondeFindQuery({id: query.scenario.mondeId}));

        this.verifyOrThrow(mondeFound, query);

        return this.repository.save({
            ...query.scenario,
            auteurIds : [query.auteurId],
            monde: {id: query.scenario.mondeId}}
        );
    }

    verifyOrThrow(mondeFound: Monde | null, query: ScenarioCreateCommand) {
        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }
}
