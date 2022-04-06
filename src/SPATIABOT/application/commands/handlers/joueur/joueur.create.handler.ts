import {JoueurCreateCommand} from "../../impl/joueur/joueur.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {JoueurRepositoryInterface} from "../../../repositories/joueur.repository.interface";
import {JoueurRepository} from "../../../../infrastructure/database/repositories/joueur.repository";
import {ScenarioGetByIdHandler} from "../../../services/scenario/scenario.get-by-id.handler";
import {JoueurAlreadyInPartieException} from "../../../../domain/exceptions/joueur/joueur-already-in-partie.exception";


@CommandHandler(JoueurCreateCommand)
export class JoueurCreateHandler implements IQueryHandler<JoueurCreateCommand> {

    constructor(
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        @InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query JoueurCreateCommand
     * @param query ScenarioHasNotThisAuteurException
     * @throws ScenarioNotFoundException
     */
    async execute(query: JoueurCreateCommand): Promise<JoueurInterface | null> {

        this.verifyUserNotAlreadyInPartie(query);

        return this.repository.save({
            user: {id: query.user.id, username : query.user.username}, // On ajoute username pour pouvoir l'utiliser dans le retour si besoin
            partie: {id: query.partie.id},
            // @todo chercher le scenario par défaut pour compléter les autres champs de joueur
        });
    }

    private verifyUserNotAlreadyInPartie(query: JoueurCreateCommand) {

        const joueurFound = query.partie.joueurs.find(j => j.userId === query.user.id);

        if (joueurFound) {
            throw new JoueurAlreadyInPartieException();
        }

    }


}
