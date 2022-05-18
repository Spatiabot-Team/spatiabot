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
import {Reponse} from "../../../domain/entities/reponse";

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
    async execute(query: JoueurReponseChoisirCommand): Promise<ReponseInterface | null> {

        // Récupérer le joueur avec son étape en cours et les réponses disponnibles
        const joueur = await this.joueurRepository.findOne({
            where: {id: query.joueurId},
            relations: ['etapeEnCours', 'etapeEnCours.reponses']
        });

        // C'est une réponse à une fin de scénario => on en affecte un autre et on arrête là
        if(joueur.etapeEnCours.finScenario){
            //@todo mieux gérer ce cas là
            await this.commandBus.execute(new JoueurScenarioAffecterCommand(query.joueurId));
            const r = new Reponse();
            r.texte = 'La prochaine aventure arrive bientôt...';
            return r;
        }

        // Vérifier la situation du joueur et throw si c'est pas bon (il a une étape encours, la réponse existe...)
        this.verify(query, joueur);

        // Définir la conséquence que l'on applique parmi les conséquences possibles de la réponse choisie
        const reponse : ReponseInterface = this.findReponse(joueur.etapeEnCours.reponses, query.reponseLibelle);
        const consequencePossible = this.randomItemByPoidsService.execute(reponse.consequencePossibles);

        // Mettre à jour le joueur
        this.joueurRepository.save({
            id : joueur.id,
            etapeEnCoursEtat : EtapeEtatEnum.A_AFFICHER,
            etapeEnCours : {id : consequencePossible.etapeSuivanteId},
            etapeDateAffichage : this.etapeNextDateHandler.execute()
        });

        return reponse;
    }

    /**
     * Il doit avoir une étape en cours
     */
    verify(query: JoueurReponseChoisirCommand, joueur) {

        if (joueur.etapeEnCoursEtat !== EtapeEtatEnum.ATTENTE_REPONSE) {
            throw new JoueurEtapePasDeReponseEnAttenteException();
        }


    }

    findReponse(reponses : ReponseInterface[],reponseLibelle: string) : ReponseInterface{

        if (!reponses) {
            throw new ReponseNotFoundException();
        }

        const reponse  = reponses.find(r => r.libelle === reponseLibelle);

        if(reponse){
            return reponse;
        }

        throw new ReponseNotFoundException();
    }
}
