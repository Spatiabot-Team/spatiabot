import {EnvoyerSuiteScenarioCron} from "./envoyer-suite-scenario.cron";
import {AffecterScenarioJoueurAttenteCron} from "./affecter-scenario-joueur-attente.cron";

export const CRONS = [
    EnvoyerSuiteScenarioCron,
    AffecterScenarioJoueurAttenteCron,
]
