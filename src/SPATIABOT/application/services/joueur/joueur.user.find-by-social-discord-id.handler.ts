import {InjectRepository} from "@nestjs/typeorm";
import {JoueurRepository} from "../../../infrastructure/database/repositories/joueur.repository";
import {JoueurRepositoryInterface} from "../../repositories/joueur.repository.interface";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";


export class JoueurUserFindBySocialDiscordIdHandler {

    constructor(@InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface) {
        this.repository = repository;
    }

    async execute(discordId: string): Promise<JoueurInterface[] | null> {
        return await this.repository.findAllBySocialDiscordId(discordId);
    }

}
