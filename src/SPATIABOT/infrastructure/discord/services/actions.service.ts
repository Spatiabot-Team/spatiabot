import {Injectable} from "@nestjs/common";
import {ActionNotFoundException} from "../exceptions/action-not-found.exception";
import {CommandBus} from "@nestjs/cqrs";
import {MessageFromDiscord} from "../../../../DISCORD/domain/entities/message-from-discord.entity";
import {AbstractDiscordActionCommand} from "../commands/impl/abstract-discord-action.command";
import {DiscordDecollageInfraCommand} from "../commands/impl/discord-decollage-infra.command";

@Injectable()
export class ActionsService {

    /**
     * @todo voir si on peut trouver une meilleure sollution pour le routing
     * => rendre (message: MessageFromDiscord) => void plus dynamique
     */
    actions: { [key: string]: { event: (message: MessageFromDiscord) => AbstractDiscordActionCommand } } =
        {
            'd': {'event': (message: MessageFromDiscord) => new DiscordDecollageInfraCommand(message)},
            'decollage': {'event': (message: MessageFromDiscord) => new DiscordDecollageInfraCommand(message)},
        };

    actionsAdmin: { [key: string]: { event: (message: MessageFromDiscord) => void } } =
        {
            // 'creer-partie': {'event': (message: MessageFromDiscord) => new DiscordDecollageCommand(message)},
        };

    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    async execute(key: string, message: MessageFromDiscord) {

        if (this.actions[key]) {
            await this.commandBus.execute(this.actions[key].event(message));
            return;
        }

        if (this.actionsAdmin[key]) {
            return;
        }

        // Si on arrive là c'est qu'on a pas trouvé d'action correspondant à la commande
        throw new ActionNotFoundException()
    }
}
