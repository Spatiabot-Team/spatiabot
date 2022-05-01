import {CommandBus, CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {EtapeEtatEnum} from "../../../domain/enums/etape-etat.enum";
import {
    JoueurEtapePasDeReponseEnAttenteException
} from "../../../domain/exceptions/joueur/joueur.etape.pas-de-reponse-en-attente.exception";
import {ReponseNotFoundException} from "../../../domain/exceptions/reponse/reponse.not-found.exception";
import {RandomItemByPoidsService} from "../../../domain/services/random-item-by-poids.service";
import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";
import {EtapeNextDateHandler} from "../../queries/etape/etape.next-date.handler";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";
import {JoueurScenarioAffecterCommand} from "../joueur/joueur.scenario.affecter.command";
import {JoueurReponseChoisirCommand} from "../joueur/joueur.reponse.choisir.command";

@CommandHandler(JoueurReponseChoisirCommand)
export class JoueurResponseChoisirHandler implements IQueryHandler<JoueurReponseChoisirCommand> {

    constructor(
        @InjectRepository(JoueurRepository) private readonly joueurRepository: JoueurRepositoryInterface,
        private readonly randomItemByPoidsService : RandomItemByPoidsService,
        private readonly etapeNextDateHandler : EtapeNextDateHandler,
        private readonly commandBus : CommandBus
    ) {
    }

    /**
     * @throws JoueurEtapePasDeReponseEnAttenteException
     */
    async execute(query: JoueurReponseChoisirCommand): Promise<JoueurInterface | null> {

        // Récupérer le joueur avec son étape en cours et les réponses disponnibles
        const joueur = await this.joueurRepository.findOne({
            where: {id: query.joueurId},
            relations: ['etapeEnCours', 'etapeEnCours.reponses']
        });

        // Si l'étape en cours est la fin du scenario alors on réoriente vers la sélection d'un autre scenario
        if(joueur.etapeEnCours.finScenario){
            return this.commandBus.execute(new JoueurScenarioAffecterCommand(query.joueurId));
        }

        // Vérifier la situation du joueur et throw si c'est pas bon (il a une étape encours, la réponse existe...)
        this.verify(query, joueur);

        // Définir la conséquence que l'on applique parmi les conséquences possibles de la réponse choisie
        const reponse : ReponseInterface = this.findReponse(joueur.etapeEnCours.reponses, query);
        const consequencePossible = this.randomItemByPoidsService.execute(reponse.consequencePossibles);

        // Mettre à jour le joueur
        return this.joueurRepository.save({
            id : joueur.id,
            etapeEnCoursEtat : EtapeEtatEnum.A_AFFICHER,
            etapeEnCours : {id : consequencePossible.etapeSuivanteId},
            etapeDateAffichage : this.etapeNextDateHandler.execute()
        });
    }

    /**
     * Il doit avoir une étape en cours
     */
    verify(query: JoueurReponseChoisirCommand, joueur) {

        if (joueur.etapeEnCoursEtat !== EtapeEtatEnum.ATTENTE_REPONSE) {
            throw new JoueurEtapePasDeReponseEnAttenteException();
        }


    }

    findReponse(reponses : ReponseInterface[],query: JoueurReponseChoisirCommand) : ReponseInterface{

        if (!reponses) {
            throw new ReponseNotFoundException();
        }

        const reponse  = reponses.find(r => r.libelle === query.reponseLibelle);

        if(reponse){
            return reponse;
        }

        throw new ReponseNotFoundException();
    }
}
