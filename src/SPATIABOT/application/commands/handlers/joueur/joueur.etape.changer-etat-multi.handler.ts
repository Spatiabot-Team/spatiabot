import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {JoueurRepositoryInterface} from "../../../repositories/joueur.repository.interface";
import {JoueurRepository} from "../../../../infrastructure/database/repositories/joueur.repository";
import {JoueurEtapeChangerEtatMultiCommand} from "../../impl/joueur/joueur.etape.changer-etat-multi.command";


@CommandHandler(JoueurEtapeChangerEtatMultiCommand)
export class JoueurEtapeChangerEtatMultiHandler implements IQueryHandler<JoueurEtapeChangerEtatMultiCommand> {

    constructor(
        @InjectRepository(JoueurRepository) private readonly repository: JoueurRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     */
    async execute(query: JoueurEtapeChangerEtatMultiCommand) {
        return this.repository.changerEtatEtape(query.joueurIds, query.etat);
    }

}
