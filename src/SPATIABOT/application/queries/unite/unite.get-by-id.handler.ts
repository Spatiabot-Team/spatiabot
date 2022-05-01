import {InjectRepository} from "@nestjs/typeorm";
import {UniteRepository} from "../../../infrastructure/database/repositories/unite.repository";
import {UniteRepositoryInterface} from "../../repositories/unite.repository.interface";
import {UniteGetByIdQuery} from "./unite.get-by-id.query";
import {Unite} from "../../../domain/entities/unite";

export class UniteGetByIdHandler {

    constructor(@InjectRepository(UniteRepository) private readonly repository: UniteRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: UniteGetByIdQuery): Promise<Unite | null> {
        const uniteFound = await this.repository.findOne(query.id);
        if (!uniteFound) {
            return null;
        }
        return Object.assign(new Unite(), uniteFound);
    }
}
