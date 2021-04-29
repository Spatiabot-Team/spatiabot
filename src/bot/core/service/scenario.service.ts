import {Injectable} from '@nestjs/common';
import {Scenario} from "../entity/scenario.entity";
import {Etape} from "../entity/etape.entity";


@Injectable()
export class ScenarioService {

    public static getPremiereEtape(scenario: Scenario) : Etape{
        return scenario.etapes.find(e => e.id == scenario.premiereEtape);
    }

}
