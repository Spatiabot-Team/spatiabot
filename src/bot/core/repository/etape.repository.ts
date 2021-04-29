import {EntityRepository, Repository} from "typeorm";
import {Etape} from "../entity/etape.entity";
import {Scenario} from "../entity/scenario.entity";

@EntityRepository(Etape)
export class EtapeRepository extends Repository<Etape> {

    nextDateAffichage() : Date{
        return this.calcNextDateAffichageEtape(parseFloat(process.env.minMinutesWaitingEvent), parseFloat(process.env.maxMinutesWaitingEvent));
    }

    /**
     * Calcule dans combien de temps l'étape pourra être affichée au joueur
     * @param minTimeWait en millisecondes
     * @param maxTimeWait en millisecondes
     * @private
     */
    private calcNextDateAffichageEtape(minTimeWait: number, maxTimeWait: number): Date {
        return new Date(
            Date.now() + (Math.random() * (maxTimeWait - minTimeWait) + minTimeWait)
        );
    }
}
