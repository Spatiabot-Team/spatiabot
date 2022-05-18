import {InjectRepository} from "@nestjs/typeorm";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";

export class JoueurFindAllEnAttenteScenarioHandler {

    constructor(@InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface) {
        this.repository = repository;
    }

    async execute(): Promise<JoueurInterface[] | null> {
        return await this.repository.findAllEnAttenteScenario();
    }

}
