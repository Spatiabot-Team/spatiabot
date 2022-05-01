import {JoueurGetByIdQuery} from "./joueur.get-by-id.query";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {Joueur} from "../../../domain/entities/joueur";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";

export class JoueurGetByIdHandler {

    constructor(
        @InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: JoueurGetByIdQuery): Promise<Joueur | null> {
        const joueurFound = await this.repository.findOne(query.id);
        if (!joueurFound) {
            return null;
        }
        return new Joueur(joueurFound);
    }
}
