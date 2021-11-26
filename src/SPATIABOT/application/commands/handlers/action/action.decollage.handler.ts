import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {ActionDecollageCommand} from "../../impl/action/action.decollage.command";
import {DejaDecolleException} from "../../../../domain/exceptions/deja-decolle.exception";


@CommandHandler(ActionDecollageCommand)
export class ActionDecollageHandler implements IQueryHandler<ActionDecollageCommand> {

    async execute(query: ActionDecollageCommand) {
        console.log('Decollage !!');
        // Le joueur a-t-il déjà décollé ?

        // Si oui lui envoyer qu'il a déjà décollé et RETURN

        // Le user existe-t-il ?

        // Si non, le créer

        // Ajouter le user à la partie

        // Répondre au joueur qu'il décolle :D
        // commandDiscordHandler ;)

        throw new DejaDecolleException();
    }
}
