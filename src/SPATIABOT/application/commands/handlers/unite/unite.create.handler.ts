import {UniteCreateCommand} from "../../impl/unite/unite.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeFindQuery} from "../../../queries/impl/monde/monde.find.query";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {UniteRepositoryInterface} from "../../../repositories/unite.repository.interface";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";


@CommandHandler(UniteCreateCommand)
export class UniteCreateHandler implements IQueryHandler<UniteCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Créer un monde, et ça, c'est beau.
     * @param query MondeCreateCommand
     * @throws MondeAlreadyExistsException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: UniteCreateCommand): Promise<UniteInterface> {

        const mondeFound = await this.queryBus.execute(new MondeFindQuery({id: query.unite.mondeId}));

        this.verifyOrThrow(mondeFound, query);

        return this.repository.save({...query.unite, monde: {id: mondeFound.id}});
    }

    verifyOrThrow(mondeFound: Monde | null, query: UniteCreateCommand) {
        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }
}
