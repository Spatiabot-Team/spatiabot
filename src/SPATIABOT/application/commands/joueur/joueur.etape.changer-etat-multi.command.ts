import {EtapeEtatEnum} from "../../../domain/enums/etape-etat.enum";

export class JoueurEtapeChangerEtatMultiCommand {

    joueurIds: string[];
    etat: EtapeEtatEnum;

    constructor(joueurIds: string[], etat: EtapeEtatEnum) {
        this.joueurIds = joueurIds;
        this.etat = etat;
    }
}
