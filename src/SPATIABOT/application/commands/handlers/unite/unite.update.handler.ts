import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UniteRepositoryInterface} from "src/SPATIABOT/application/repositories/unite.repository.interface";
import {UniteUpdateCommand} from "../../impl/unite/unite.update.command";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";
import {UniteGetByIdQuery} from "../../../queries/impl/unite/unite.get-by-id.query";
import {UniteDoesntExistException} from "../../../../domain/exceptions/unite/unite-doesnt-exist.exception";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";


@CommandHandler(UniteUpdateCommand)
export class UniteUpdateHandler implements IQueryHandler<UniteUpdateCommand> {

    @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface;

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(UniteRepository) repository: UniteRepositoryInterface
    ) {
        this.repository = repository;
        this.repository = repository;
    }

    /**
     *
     * @param query UniteUpdateCommand
     * @throws UniteDoesntExistException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: UniteUpdateCommand): Promise<UniteInterface> {

        const uniteFound = await this.queryBus.execute(new UniteGetByIdQuery(query.unite.id));

        if (!uniteFound) {
            throw new UniteDoesntExistException();
        }

        // On vérifie que l'auteur de la requête est un auteur de ce monde
        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(uniteFound.mondeId));

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return this.repository.save(query.unite);
    }

}
