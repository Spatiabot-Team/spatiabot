import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeGetByAuteurIdQuery} from "./monde.get-by-auteur-id.query";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";

export class MondeGetByAuteurIdHandler {

    constructor(@InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: MondeGetByAuteurIdQuery):  Promise<MondeInterface[]> {
        return await this.repository.findAllByAuteurId(query.authorId);
    }
}
