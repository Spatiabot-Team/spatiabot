import {MondeFindHandler} from "./monde/monde.find.handler";
import {MondeGetByAuteurIdHandler} from "./monde/monde.get-by-auteur-id.handler";
import {MondeGetByIdHandler} from "./monde/monde.get-by-id.handler";

export const QueryHandlers = [
    // Monde
    MondeFindHandler,
    MondeGetByAuteurIdHandler,
    MondeGetByIdHandler,
];