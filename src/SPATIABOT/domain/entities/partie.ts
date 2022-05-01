import {PartieInterface} from "../interfaces/partie.interface";
import {StatInterface} from "../interfaces/stat.interface";
import {MondeInterface} from "../interfaces/monde.interface";
import {JoueurInterface} from "../interfaces/joueur.interface";

export class Partie implements PartieInterface {

    id?: string;
    created?: Date;
    actif?: boolean;
    statsMonde?: StatInterface[];
    monde?: MondeInterface;
    discordGuildUuid?: string;
    joueurs?: JoueurInterface[];

    // @OneToMany(type => Joueur, joueur => joueur.partie, {
    //     cascade: true,
    //     eager: true
    // })
    // joueurs?: Joueur[];

    // findJoueur(userDiscord : any) {
    //     // @ts-ignore
    //     return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id);
    // }
    //
    // isDansLaPartie(userDiscord : any) {
    //     // @ts-ignore
    //     return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id) != null;
    // }
}
