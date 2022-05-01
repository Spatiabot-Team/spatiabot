
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Monde} from "../../../domain/entities/monde";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeGetByIdQuery} from "./monde.get-by-id.query";

export class MondeGetByIdHandler {

    constructor(@InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: MondeGetByIdQuery): Promise<Monde | null> {
        const mondeFound = await this.repository.findOne(query.id);
        if (!mondeFound) {
            return null;
        }
        return new Monde(mondeFound);
    }
}
