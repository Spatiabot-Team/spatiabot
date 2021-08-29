import {PartieItf} from "../interfaces/partie.interface";
import {StatItf} from "../interfaces/stat.interface";
import {MondeItf} from "../interfaces/monde.interface";
import {JoueurItf} from "../interfaces/joueur.interface";

export class PartieEntity implements PartieItf {

    id?: string;
    created?: Date;
    actif?: boolean;
    stats?: StatItf[];
    monde?: MondeItf;
    discordGuild?: string;
    joueurs?: JoueurItf[];

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
