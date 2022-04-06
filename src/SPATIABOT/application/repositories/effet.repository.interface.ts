import {EffetInterface} from "../../domain/interfaces/effet.interface";

export interface EffetRepositoryInterface {
    findOne(options : any) : Promise<EffetInterface>;
    findOneById(id: number): Promise<EffetInterface>;
    findAll(): Promise<EffetInterface[]>;

    save(Effet: EffetInterface): Promise<EffetInterface>;
    delete(EffetId : string);
}
