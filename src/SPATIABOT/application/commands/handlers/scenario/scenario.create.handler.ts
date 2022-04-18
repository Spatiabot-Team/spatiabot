import {ScenarioCreateCommand} from "../../impl/scenario/scenario.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import slugify from "slugify";
import {MondeFindHandler} from "../../../services/monde/monde.find.handler";
import {MondeFindQuery} from "../../../services/monde/monde.find.query";


@CommandHandler(ScenarioCreateCommand)
export class ScenarioCreateHandler implements IQueryHandler<ScenarioCreateCommand> {

    constructor(
        private readonly mondeFindHandler: MondeFindHandler,
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

        const mondeFound = await this.mondeFindHandler.execute(new MondeFindQuery({id: query.scenario.mondeId}));

        this.verifyOrThrow(mondeFound, query);
        return this.repository.save({
            ...query.scenario,
            slug: slugify(query.scenario.titre, {lower: true}),
            auteurIds: [query.auteurId],
            monde: {id: query.scenario.mondeId}
        });
    }

    verifyOrThrow(mondeFound: Monde | null, query: ScenarioCreateCommand) {
        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }
}
