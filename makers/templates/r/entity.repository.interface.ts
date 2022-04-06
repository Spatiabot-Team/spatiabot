import {###Entity###Interface} from "../../domain/interfaces/###entity-tiret###.interface";

export interface ###Entity###RepositoryInterface {
    findOne(options : any) : Promise<###Entity###Interface>;
    findOneById(id: number): Promise<###Entity###Interface>;
    findAll(): Promise<###Entity###Interface[]>;

    save(###entityCase###: ###Entity###Interface): Promise<###Entity###Interface>;
    delete(###entityCase###Id : string);
}
