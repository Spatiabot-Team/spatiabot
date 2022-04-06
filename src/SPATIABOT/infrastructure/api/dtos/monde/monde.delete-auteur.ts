import {IsNotEmpty, IsUUID} from "class-validator";

export class MondeDeleteAuteur {

    @IsNotEmpty()
    @IsUUID("all", {message: `L'id de l'auteur n'est pas au bon format`, each: true})
    auteurId: string;

    @IsNotEmpty()
    @IsUUID("all", {message: `L'id du monde n'est pas au bon format`, each: true})
    mondeId: string;
}
