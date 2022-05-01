import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioNotFoundException} from "../../../domain/exceptions/scenario/scenario-not-found.exception";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {JoueurScenarioAffecterCommand} from "../joueur/joueur.scenario.affecter.command";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {EtapeEtatEnum} from "../../../domain/enums/etape-etat.enum";
import {EtapeNextDateHandler} from "../../queries/etape/etape.next-date.handler";


@CommandHandler(JoueurScenarioAffecterCommand)
export class JoueurScenarioAffecterHandler implements IQueryHandler<JoueurScenarioAffecterCommand> {

    constructor(
        @InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepositoryInterface,
        private readonly etapeNextDateHandler : EtapeNextDateHandler
    ) {
        this.repository = repository;
    }

    /**
     * @param query JoueurScenarioAffecterCommand
     * @param query ScenarioHasNotThisAuteurException
     * @throws ScenarioNotFoundException
     */
    async execute(query: JoueurScenarioAffecterCommand): Promise<ScenarioInterface | null> {

        // Trouver le joueur
        const joueur = await this.repository.findOne(query.joueurId);

        // Chercher le scenario que l'on va affecter au joueur
        const scenario = await this.scenarioRepository.determinerScenarioSuivantJoueur(query.joueurId);

        // Mettre à jour le joueur
        if (scenario) {
            await this.repository.save({
                id: joueur.id,
                scenarioEffectues: [...joueur.scenarioEffectues, scenario.id],
                etapeEnCours: {id: scenario.etapes[0].id},
                etapeEnCoursEtat : EtapeEtatEnum.A_AFFICHER,
                etapeDateAffichage : this.etapeNextDateHandler.execute()
            });
            return scenario;
        }

        // Retourner le scenario
        throw new ScenarioNotFoundException();
    }

    private verifyUserNotAlreadyInPartie(query: JoueurScenarioAffecterCommand) {


    }


}
