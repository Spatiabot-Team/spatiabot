import {EtapeInterface} from "../../domain/interfaces/etape.interface";
import {MondeInterface} from "../../domain/interfaces/monde.interface";

export interface EtapeRepositoryInterface {
    findOne(options : any) : Promise<MondeInterface>;
    findOneById(id: number): Promise<EtapeInterface>;
    findAll(): Promise<EtapeInterface[]>;

    save(etape: EtapeInterface): Promise<EtapeInterface>;
    delete(etapeId : string);
}
