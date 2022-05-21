import {InjectRepository} from "@nestjs/typeorm";
import {ReponseRepository} from "../../../infrastructure/database/repositories/reponse.repository";
import {ReponseRepositoryInterface} from "../../repositories/reponse.repository.interface";
import {Reponse} from "../../../domain/entities/reponse";
import {ReponseGetByIdQuery} from "./reponse.get-by-id.query";

export class ReponseGetByIdHandler {

    constructor(@InjectRepository(ReponseRepository) private readonly repository: ReponseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ReponseGetByIdQuery): Promise<Reponse | null> {
        const ReponseFound = await this.repository.findOne(query.id);
        if (!ReponseFound) {
            return null;
        }
        return Object.assign(new Reponse(), ReponseFound);
    }
}
