import {ScenarioInterface} from "../../domain/interfaces/scenario.interface";
import {ScenarioLightInterface} from "../../domain/interfaces/scenario-light.interface";

export interface ScenarioRepositoryInterface {
    // Technique
    find(options : any) : Promise<ScenarioInterface[]>;
    findOne(options : any) : Promise<ScenarioInterface>;
    findOneById(id: string): Promise<ScenarioInterface>;
    findAll(): Promise<ScenarioInterface[]>;
    findAllOfMonde(mondeId : string): Promise<ScenarioInterface[]>;
    findLightOfMonde(mondeId : string) : Promise<ScenarioLightInterface[]>

    save(scenario: ScenarioInterface): Promise<ScenarioInterface>;
    delete(scenarioId : string);

    // Métier
    /**
     * Utilise différents paramètres pour déterminer quel sera le prochain scenario du joueur passé en paramètre
     * @param joueurId
     */
    determinerScenarioSuivantJoueur(joueurId : string) : Promise<ScenarioInterface | null>
}
