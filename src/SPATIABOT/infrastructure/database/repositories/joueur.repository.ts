import {EntityRepository, Repository, UpdateResult} from "typeorm";
import {JoueurEntity} from "../entities/joueur.entity";
import {JoueurRepositoryInterface} from "../../../application/repositories/joueur.repository.interface";
import {EtapeEtatEnum} from "../../../domain/enums/etape-etat.enum";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";

@EntityRepository(JoueurEntity)
export class JoueurRepository extends Repository<JoueurEntity> implements JoueurRepositoryInterface {

    /**
     * Retourne les Joueurs qui ont une étape que l'on doit leur envoyer
     */
    findAllAAfficher(): Promise<JoueurInterface[]> {
        return this.createQueryBuilder('joueur')
        .innerJoinAndSelect('joueur.etapeEnCours', 'etape')
        .innerJoinAndSelect('joueur.user', 'user')
        .innerJoinAndSelect('user.socialDiscord', 'socialDiscord')
        .where('joueur.etapeEnCoursEtat = :etapeEnCoursEtat', {etapeEnCoursEtat: EtapeEtatEnum.A_AFFICHER})
        .andWhere('joueur.etapeDateAffichage < :etapeDateAffichage', {etapeDateAffichage: new Date(Date.now())})
        .getMany();
    }

    /**
     * Retourne les joueur correspondant au discord id et dont la partie est active
     * Dans l'objet retourné on charge : la partie, l'étape en cours, le user
     * @param discordId
     */
    findAllBySocialDiscordId(discordId : string): Promise<JoueurInterface[]> {
        return this.createQueryBuilder('joueur')
        .innerJoinAndSelect('joueur.partie', 'partie')
        .innerJoinAndSelect('joueur.etapeEnCours', 'etape')
        .innerJoinAndSelect('joueur.user', 'user')
        .innerJoinAndSelect('user.socialDiscord', 'socialDiscord')
        .where('socialDiscord.discordId = :discordId', {discordId})
        .andWhere('partie.actif = true')
        .getMany();
    }

    async changerEtatEtape(joueurIds: string[], etatEtape: EtapeEtatEnum) : Promise<UpdateResult> {
        return this.update(joueurIds, {etapeEnCoursEtat: etatEtape});
    }
}
