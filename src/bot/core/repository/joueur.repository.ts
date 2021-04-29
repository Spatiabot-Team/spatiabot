import {EntityRepository, Repository} from "typeorm";
import {Joueur} from "../entity/joueur.entity";
import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {Etape} from "../entity/etape.entity";


@EntityRepository(Joueur)
export class JoueurRepository extends Repository<Joueur> {

    async changerEtape(joueur: Joueur, etape: Etape, dateAffichage: Date) {
        return await this.update(joueur.id, {
            etapeEnCours: etape,
            etapeEnCoursEtat: EtapeEtatEnum.A_AFFICHER,
            etapeDateAffichage: dateAffichage
        });
    }

    async findByDiscordUserId(discordId: string): Promise<Joueur[]> {
        return await this.find({
            relations : ['partie'],
            where: qb => {
                qb.where('Joueur_user_socialDiscord.discordId = :discordId', {
                    discordId
                })
            }
        });
    }
}
