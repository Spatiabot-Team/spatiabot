import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UniteDeleteCommand} from "../unite/unite.delete.command";
import {UniteInterface} from "../../../domain/interfaces/unite.interface";
import {MondeHasNotThisAuteurException} from "../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {UniteNotFoundException} from "../../../domain/exceptions/unite/unite-not-found.exception";
import {UniteRepository} from "../../../infrastructure/database/repositories/unite.repository";
import {UniteRepositoryInterface} from "../../repositories/unite.repository.interface";
import {UniteGetByIdQuery} from "../../queries/unite/unite.get-by-id.query";
import {UniteGetByIdHandler} from "../../queries/unite/unite.get-by-id.handler";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";

@CommandHandler(UniteDeleteCommand)
export class UniteDeleteHandler implements IQueryHandler<UniteDeleteCommand> {

    constructor(
        private readonly uniteGetByIdHandler: UniteGetByIdHandler,
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface
    ) {}

    /**
     * Supprime un unite s'il existe et si l'auteur est bien un auteur de ce unite
     * @param query UniteDeleteCommand
     * @throws UniteNotFoundException
     * @throws UniteHasNotThisAuteurException
     */
    async execute(query: UniteDeleteCommand): Promise<UniteInterface> {

        const uniteFound = await this.uniteGetByIdHandler.execute(new UniteGetByIdQuery(query.uniteId));

        if (!uniteFound) {
            throw new UniteNotFoundException();
        }

        // On vérifie que l'auteur de la requête est un auteur de ce monde
        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(uniteFound.mondeId));

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return this.repository.delete(query.uniteId);
    }
}
