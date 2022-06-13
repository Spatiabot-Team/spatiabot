import {JoueurEtapeEnCoursChangedEvent} from "./joueur.etape-en-cours-changed.event";
import {InjectRepository} from "@nestjs/typeorm";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {StatRepository} from "../../../infrastructure/database/repositories/stat.repository";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {StatRepositoryInterface} from "../../repositories/stat.repository.interface";
import {PartieInterface} from "../../../domain/interfaces/partie.interface";
import {EffetInterface} from "../../../domain/interfaces/effet.interface";
import {StatInterface} from "../../../domain/interfaces/stat.interface";
import {PorteeEnum} from "../../../domain/enums/portee.enum";


@EventsHandler(JoueurEtapeEnCoursChangedEvent)
export class JoueurEtapeEnCoursChangedHandler implements IEventHandler<JoueurEtapeEnCoursChangedEvent> {

    constructor(
        @InjectRepository(JoueurRepository) private readonly joueurRepository: JoueurRepositoryInterface,
        @InjectRepository(StatRepository) private readonly statRepository: StatRepositoryInterface,
    ) {
    }

    async handle(event: JoueurEtapeEnCoursChangedEvent) {

        // Récupérer l'étape en question avec les effets à appliquer, ainsi que la partie du joueur
        const joueur = await this.joueurRepository.findOne({
            relations: ['etapeEnCours', 'etapeEnCours.effets', 'partie', 'partie.statsMonde']
        });
        const effets = joueur.etapeEnCours.effets;

        // Appliquer les effets de type monde à la partie
        const stats = this.getStatPartieApresApplicationEffets(
            joueur.partie, joueur.etapeEnCours.effets.filter(
                effet => effet.unite.portee === PorteeEnum.MONDE
            )
        );
        this.statRepository.save(stats);

        // NON IMPLEMENTE POUR L'INSTANT : Appliquer les effets de type joueur au joueur

        // Eventuellement ici voir si cela déclenche quelque chose genre pirates > seuil déclencher scenario mondial...

        // FiN <3

    }

    getStatPartieApresApplicationEffets(partie: PartieInterface, effets: EffetInterface[]): StatInterface[] {
        effets.forEach(effet => {
            let stat: StatInterface = partie.statsMonde.find(stat => stat.unite.id === effet.unite.id);

            if (!stat) {
                stat = {unite: effet.unite, quantite: 0, partieId: partie.id}
                partie.statsMonde.push(stat);
            }
            stat.quantite += effet.quantite;
        });
        return partie.statsMonde;
    }
}
