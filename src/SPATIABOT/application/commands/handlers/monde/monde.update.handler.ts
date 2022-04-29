import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepositoryInterface} from "src/SPATIABOT/application/repositories/monde.repository.interface";
import {MondeUpdateCommand} from "../../impl/monde/monde.update.command";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import slugify from "slugify";
import {MondeGetByIdHandler} from "../../../services/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../../services/monde/monde.get-by-id.query";


@CommandHandler(MondeUpdateCommand)
export class MondeUpdateHandler implements IQueryHandler<MondeUpdateCommand> {

    @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface;

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        @InjectRepository(MondeRepository) repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query MondeUpdateCommand
     * @throws MondeNotFoundException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: MondeUpdateCommand): Promise<MondeInterface> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.monde.id));

        this.verifyOrThrow(mondeFound, query);

        return this.repository.save({...query.monde, slug : slugify(query.monde.nom,{lower:true})});
    }

    verifyOrThrow(mondeFound: Monde | null, query: MondeUpdateCommand) {
        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }

}
