import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";
import {JoueurGetByIdQuery} from "../../queries/joueur/joueur.get-by-id.query";
import {JoueurGetByIdHandler} from "../../queries/joueur/joueur.get-by-id.handler";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {JoueurDeleteCommand} from "../joueur/joueur.delete.command";
import {JoueurNotFoundException} from "../../../domain/exceptions/joueur/joueur.not-found.exception";
@CommandHandler(JoueurDeleteCommand)
export class JoueurDeleteHandler implements IQueryHandler<JoueurDeleteCommand> {

    constructor(
        private readonly joueurGetByIdHandler: JoueurGetByIdHandler,
        @InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un ###entity### s'il existe et si l'auteur est bien un auteur de ce ###entity###
     * @param query JoueurDeleteCommand
     * @throws JoueurDoesntExistException
     * @throws JoueurHasNotThisAuteurException
     */
    async execute(query: JoueurDeleteCommand): Promise<JoueurInterface> {

        const joueurFound = await this.joueurGetByIdHandler.execute(new JoueurGetByIdQuery(query.joueurId));

        if (!joueurFound) {
            throw new JoueurNotFoundException();
        }

        return this.repository.delete(query.joueurId);
    }
}
