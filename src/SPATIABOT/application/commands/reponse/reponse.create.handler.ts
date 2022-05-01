import {ReponseCreateCommand} from "../reponse/reponse.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ReponseRepository} from "../../../infrastructure/database/repositories/reponse.repository";
import {ReponseRepositoryInterface} from "../../repositories/reponse.repository.interface";
import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";

@CommandHandler(ReponseCreateCommand)
export class ReponseCreateHandler implements IQueryHandler<ReponseCreateCommand> {

    constructor(
        
        @InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query ReponseCreateCommand
     */
    async execute(query: ReponseCreateCommand): Promise<ReponseInterface> {
        return this.repository.save({
            ...query.reponse
        });
    }
}
