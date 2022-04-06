import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ReponseRepositoryInterface} from "src/SPATIABOT/application/repositories/reponse.repository.interface";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {Reponse} from "../../../../domain/entities/reponse";
import {ReponseRepository} from "../../../../infrastructure/database/repositories/reponse.repository";
import {ReponseNotFoundException} from "../../../../domain/exceptions/reponse/reponse.not-found.exception";
import {ReponseUpdateCommand} from "../../impl/reponse/reponse.update.command";
import {ReponseGetByIdHandler} from "../../../services/reponse/reponse.get-by-id.handler";
import {ReponseGetByIdQuery} from "../../../services/reponse/reponse.get-by-id.query";


@CommandHandler(ReponseUpdateCommand)
export class ReponseUpdateHandler implements IQueryHandler<ReponseUpdateCommand> {

    @InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface;

    constructor(
        private readonly reponseGetByIdHandler: ReponseGetByIdHandler,
        @InjectRepository(ReponseRepository) repository: ReponseRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query ReponseUpdateCommand
     * @throws ReponseNotFoundException
     */
    async execute(query: ReponseUpdateCommand): Promise<ReponseInterface> {

        const reponseFound = await this.reponseGetByIdHandler.execute(new ReponseGetByIdQuery(query.reponse.id));

        this.verifyOrThrow(reponseFound, query);

        return this.repository.save(query.reponse);
    }

    verifyOrThrow(reponseFound: Reponse | null, query: ReponseUpdateCommand) {
        if (!reponseFound) {
            throw new ReponseNotFoundException();
        }
    }

}
