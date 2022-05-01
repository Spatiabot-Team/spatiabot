import {InjectRepository} from "@nestjs/typeorm";
import {EffetRepositoryInterface} from "../../repositories/effet.repository.interface";
import {EffetRepository} from "../../../infrastructure/database/repositories/effet.repository";
import {EffetGetByIdQuery} from "./effet.get-by-id.query";
import {Effet} from "../../../domain/entities/effet";

export class EffetGetByIdHandler {

    constructor(@InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: EffetGetByIdQuery): Promise<Effet | null> {
        const EffetFound = await this.repository.findOne(query.id);
        if (!EffetFound) {
            return null;
        }
        return Object.assign(new Effet(), EffetFound);
    }
}
