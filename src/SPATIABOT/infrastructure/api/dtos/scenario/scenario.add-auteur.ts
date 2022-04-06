import {IsNotEmpty, IsUUID} from "class-validator";

export class ScenarioAddAuteur {

    @IsNotEmpty()
    @IsUUID("all", {message: `L'id de l'auteur n'est pas au bon format`, each: true})
    auteurId: string;

    @IsNotEmpty()
    @IsUUID("all", {message: `L'id du scenario n'est pas au bon format`, each: true})
    scenarioId: string;
}
