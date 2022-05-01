import {isUUID} from "@nestjs/common/utils/is-uuid";

export class AuteurFindByIdsQuery {

    ids: string[];

    constructor(ids: string[]) {

        ids.forEach(id => {
            if(!isUUID(id)){
                throw new Error(`Au moins un id de la recherche auteur n'est pas au bon format.`);
            }
        });

        this.ids = ids;

    }
}
