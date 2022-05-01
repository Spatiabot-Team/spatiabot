import {Monde} from "../../../domain/entities/monde";

export class MondeIsAuteurQuery {

    monde: Monde;
    userId: string;

    constructor(monde: Monde,userId : string) {
        this.monde = monde;
        this.userId = userId;
    }
}
