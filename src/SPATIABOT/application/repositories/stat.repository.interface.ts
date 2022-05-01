import {StatInterface} from "../../domain/interfaces/stat.interface";

export interface StatRepositoryInterface {
    save(stat: StatInterface | StatInterface[]): Promise<StatInterface>;

    findOne(options : any) : Promise<StatInterface>;
    delete(statId: string);
}
