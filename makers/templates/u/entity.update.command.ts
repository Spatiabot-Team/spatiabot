import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";

export class ###Entity###UpdateCommand {

    ###entityCase###: ###Entity###Interface;
    auteurId: string;

    constructor(###entityCase###: ###Entity###Interface, auteurId: string) {
        this.###entityCase### = ###entityCase###;
        this.auteurId = auteurId;
    }
}
