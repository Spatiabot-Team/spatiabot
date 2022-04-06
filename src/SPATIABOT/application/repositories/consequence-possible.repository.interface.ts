import {ConsequencePossibleInterface} from "../../domain/interfaces/consequence-possible.interface";

export interface ConsequencePossibleRepositoryInterface {
    findOne(options : any) : Promise<ConsequencePossibleInterface>;
    findOneById(id: number): Promise<ConsequencePossibleInterface>;
    findAll(): Promise<ConsequencePossibleInterface[]>;

    save(consequencePossible: ConsequencePossibleInterface): Promise<ConsequencePossibleInterface>;
    delete(consequencePossibleId : string);
}
