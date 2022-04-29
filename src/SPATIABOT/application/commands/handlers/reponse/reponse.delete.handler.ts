import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ReponseNotFoundException} from "../../../../domain/exceptions/reponse/reponse.not-found.exception";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ReponseRepository} from "../../../../infrastructure/database/repositories/reponse.repository";
import {ReponseRepositoryInterface} from "../../../repositories/reponse.repository.interface";
import {ReponseDeleteCommand} from "../../impl/reponse/reponse.delete.command";
import {ReponseGetByIdHandler} from "../../../services/reponse/reponse.get-by-id.handler";
import {ReponseGetByIdQuery} from "../../../services/reponse/reponse.get-by-id.query";

@CommandHandler(ReponseDeleteCommand)
export class ReponseDeleteHandler implements IQueryHandler<ReponseDeleteCommand> {

    constructor(
        private readonly reponseGetByIdHandler: ReponseGetByIdHandler,
        @InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un ###entity### s'il existe et si l'auteur est bien un auteur de ce ###entity###
     * @param query ReponseDeleteCommand
     * @throws ReponseDoesntExistException
     * @throws ReponseHasNotThisAuteurException
     */
    async execute(query: ReponseDeleteCommand): Promise<ReponseInterface> {

        const ReponseFound = await this.reponseGetByIdHandler.execute(new ReponseGetByIdQuery(query.ReponseId));

        if (!ReponseFound) {
            throw new ReponseNotFoundException();
        }

        return this.repository.delete(query.ReponseId);
    }
}
