import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import { UniteDeleteCommand } from "../../impl/unite/unite.delete.command";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {UniteGetByIdQuery} from "../../../queries/impl/unite/unite.get-by-id.query";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";
import {UniteRepositoryInterface} from "../../../repositories/unite.repository.interface";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {UniteNotFoundException} from "../../../../domain/exceptions/unite/unite-not-found.exception";

@CommandHandler(UniteDeleteCommand)
export class UniteDeleteHandler implements IQueryHandler<UniteDeleteCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un unite s'il existe et si l'auteur est bien un auteur de ce unite
     * @param query UniteDeleteCommand
     * @throws UniteNotFoundException
     * @throws UniteHasNotThisAuteurException
     */
    async execute(query: UniteDeleteCommand): Promise<UniteInterface> {

        const uniteFound = await this.queryBus.execute(new UniteGetByIdQuery(query.uniteId));

        if (!uniteFound) {
            throw new UniteNotFoundException();
        }

        // On vérifie que l'auteur de la requête est un auteur de ce monde
        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(uniteFound.mondeId));

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return this.repository.delete(query.uniteId);
    }
}
