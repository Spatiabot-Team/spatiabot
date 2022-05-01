import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepositoryInterface} from "src/SPATIABOT/application/repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {Scenario} from "../../../domain/entities/scenario";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioNotFoundException} from "../../../domain/exceptions/scenario/scenario-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioUpdateCommand} from "../scenario/scenario.update.command";
import slugify from "slugify";
import {ScenarioGetByIdHandler} from "../../queries/scenario/scenario.get-by-id.handler";
import {ScenarioGetByIdQuery} from "../../queries/scenario/scenario.get-by-id.query";


@CommandHandler(ScenarioUpdateCommand)
export class ScenarioUpdateHandler implements IQueryHandler<ScenarioUpdateCommand> {

    @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface;

    constructor(
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        @InjectRepository(ScenarioRepository) repository: ScenarioRepositoryInterface
    ) {
    }

    /**
     *
     * @param query ScenarioUpdateCommand
     * @throws ScenarioNotFoundException
     * @throws ScenarioHasNotThisAuteurException
     */
    async execute(query: ScenarioUpdateCommand): Promise<ScenarioInterface> {

        const scenarioFound = await this.scenarioGetByIdHandler.execute(new ScenarioGetByIdQuery(query.scenario.id));

        this.verifyOrThrow(scenarioFound, query);


        let scenarioUpdate = {...query.scenario};
        if(query.scenario.titre){
            scenarioUpdate.slug = slugify(query.scenario.titre,{lower:true});
        }
        return this.repository.save(scenarioUpdate);
    }

    verifyOrThrow(scenarioFound: Scenario | null, query: ScenarioUpdateCommand) {
        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }
    }

}
