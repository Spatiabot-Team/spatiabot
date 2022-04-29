import {UniteCreateCommand} from "../../impl/unite/unite.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {UniteRepositoryInterface} from "../../../repositories/unite.repository.interface";
import {UniteRepository} from "../../../../infrastructure/database/repositories/unite.repository";
import {MondeFindHandler} from "../../../services/monde/monde.find.handler";
import {MondeFindQuery} from "../../../services/monde/monde.find.query";


@CommandHandler(UniteCreateCommand)
export class UniteCreateHandler implements IQueryHandler<UniteCreateCommand> {

    constructor(
        private readonly mondeFindHandler: MondeFindHandler,
        @InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface
    ) {
    }

    /**
     * Créer un monde, et ça, c'est beau.
     * @param query MondeCreateCommand
     * @throws MondeAlreadyExistsException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: UniteCreateCommand): Promise<UniteInterface> {

        const mondeFound = await this.mondeFindHandler.execute(new MondeFindQuery({id: query.unite.mondeId}));

        this.verifyOrThrow(mondeFound, query);

        return this.repository.save({...query.unite, monde: {id: mondeFound.id}});
    }

    verifyOrThrow(mondeFound: Monde | null, query: UniteCreateCommand) {
        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }
}
