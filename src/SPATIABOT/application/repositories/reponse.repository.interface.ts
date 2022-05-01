import {ReponseInterface} from "../../domain/interfaces/reponse.interface";

export interface ReponseRepositoryInterface {
    findOne(options : any) : Promise<ReponseInterface>;
    findOneById(id: number): Promise<ReponseInterface>;
    findAll(): Promise<ReponseInterface[]>;

    save(Reponse: ReponseInterface): Promise<ReponseInterface>;
    delete(ReponseId : string);
}
