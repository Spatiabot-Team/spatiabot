import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UniteRepositoryInterface} from "src/SPATIABOT/application/repositories/unite.repository.interface";
import {UniteUpdateCommand} from "../../impl/unite/unite.update.command";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {UniteRepository} from "src/SPATIABOT/infrastructure/database/repositories/unite.repository";
import {UniteGetByIdQuery} from "../../../services/unite/unite.get-by-id.query";
import {UniteGetByIdHandler} from "../../../services/unite/unite.get-by-id.handler";
import {UniteNotFoundException} from "../../../../domain/exceptions/unite/unite-not-found.exception";
import {MondeGetByIdHandler} from "../../../services/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../../services/monde/monde.get-by-id.query";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";


@CommandHandler(UniteUpdateCommand)
export class UniteUpdateHandler implements IQueryHandler<UniteUpdateCommand> {

    constructor(
        private readonly uniteGetByIdHandler: UniteGetByIdHandler,
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface
    ) {
    }

    /**
     *
     * @param query UniteUpdateCommand
     * @throws UniteNotFoundException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: UniteUpdateCommand): Promise<UniteInterface> {

        const uniteFound = await this.uniteGetByIdHandler.execute(new UniteGetByIdQuery(query.unite.id));

        if (!uniteFound) {
            throw new UniteNotFoundException();
        }

        // On vérifie que l'auteur de la requête est un auteur de ce monde
        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(uniteFound.mondeId));

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return this.repository.save(query.unite);
    }

}
