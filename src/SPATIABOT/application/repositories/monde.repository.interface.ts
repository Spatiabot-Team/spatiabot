import {MondeInterface} from "../../domain/interfaces/monde.interface";

export interface MondeRepositoryInterface {
    /**
     * Soit options = id
     * Soit option = { where : ...}
     * @param options
     */
    findOne(options : any) : Promise<MondeInterface | null>;
    findAllByAuteurId(id: string): Promise<MondeInterface[]>;
    save(monde: MondeInterface): Promise<MondeInterface>;
    delete(mondeId: string);
}
