import {UniteInterface} from "../../domain/interfaces/unite.interface";
import {MondeInterface} from "../../domain/interfaces/monde.interface";

export interface UniteRepositoryInterface {
    findOne(options : any) : Promise<MondeInterface>;
    findOneById(id: number): Promise<UniteInterface>;
    findAll(): Promise<UniteInterface[]>;

    save(unite: UniteInterface): Promise<UniteInterface>;
    delete(uniteId : string);
}
