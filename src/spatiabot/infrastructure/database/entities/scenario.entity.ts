import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioItf} from "../../../domain/interfaces/scenario.interface";

@Entity()
export class Scenario implements ScenarioItf{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

}
