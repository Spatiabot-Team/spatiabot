import {JoueurInterface} from "../../domain/interfaces/joueur.interface";
import {UpdateResult} from "typeorm";
import {EtapeEtatEnum} from "../../domain/enums/etape-etat.enum";

export interface JoueurRepositoryInterface {
    save(joueur: JoueurInterface): Promise<JoueurInterface>;

    findOne(options: any): Promise<JoueurInterface>;

    findAllAAfficher(): Promise<JoueurInterface[]>;

    changerEtatEtape(joueurIds: string[], etat: EtapeEtatEnum): Promise<UpdateResult>;

    findAllBySocialDiscordId(discordId: string): Promise<JoueurInterface[]>;
}
