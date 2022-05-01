import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {ScenarioNotFoundException} from "../../../domain/exceptions/scenario/scenario-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {UserRepository} from "../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../USER/application/repositories/user.repository.interface";
import {Scenario} from "../../../domain/entities/scenario";
import {ScenarioAddAuteurCommand} from "../scenario/scenario.add-auteur.command";
import {UserNotFoundException} from "../../../domain/exceptions/auteur/user-not-found.exception";
import {
    ScenarioHasAlreadyThisAuteurException
} from "../../../domain/exceptions/scenario/scenario-has-already-this-auteur.exception";
import {ScenarioGetByIdHandler} from "../../queries/scenario/scenario.get-by-id.handler";
import {ScenarioGetByIdQuery} from "../../queries/scenario/scenario.get-by-id.query";

@CommandHandler(ScenarioAddAuteurCommand)
export class ScenarioAddAuteurHandler implements IQueryHandler<ScenarioAddAuteurCommand> {

    constructor(
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface
    ) {
    }

    /**
     *
     * @param query ScenarioAddAuteurCommand
     * @throws ScenarioNotFoundException
     * @throws ScenarioHasNotThisAuteurException
     * @throws ScenarioHasAlreadyThisAuteurException
     */
    async execute(query: ScenarioAddAuteurCommand): Promise<ScenarioInterface> {

        const scenarioFound = await this.scenarioGetByIdHandler.execute(new ScenarioGetByIdQuery(query.scenarioId));
        this.verify(scenarioFound,query);

        const user = await this.userRepository.findOne(query.auteurId);
        if(!user){
            throw new UserNotFoundException();
        }

        scenarioFound.addAuteurId(query.auteurToAddId)

        return this.repository.save({id: scenarioFound.id, auteurIds: scenarioFound.auteurIds});
    }

    verify(scenarioFound : Scenario,query: ScenarioAddAuteurCommand){
        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        /** L'auteur qui veut ajouter un auteur doit être auteur de ce scenario */
        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }

        /** L'auteur à ajouter ne doit pas déjà être dans ce scenario */
        if (scenarioFound.hasAuteur(query.auteurToAddId)) {
            throw new ScenarioHasAlreadyThisAuteurException();
        }
    }
}
