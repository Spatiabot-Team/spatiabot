import {Injectable} from "@nestjs/common";
import {ActionNotFoundException} from "../exceptions/action-not-found.exception";
import {CommandBus} from "@nestjs/cqrs";
import {MessageFromDiscord} from "../../../../DISCORD/domain/entities/message-from-discord.entity";
import {AbstractDiscordActionCommand} from "../commands/impl/abstract-discord-action.command";
import {DiscordDecollageCommand} from "../commands/impl/discord-decollage.command";
import {AnswerInChannelCommand} from "../../../../DISCORD/application/commands/impl/answer-in-channel.command";
import {TestCommand} from "../commands/impl/test.command";

@Injectable()
export class ActionsService {

    /**
     * @todo voir si on peut trouver une meilleure sollution pour le routing
     * => rendre (message: MessageFromDiscord) => void plus dynamique
     */
    actions: { [key: string]: { event: (message: MessageFromDiscord) => AbstractDiscordActionCommand } } =
        {
            'd': {'event': (message: MessageFromDiscord) => new DiscordDecollageCommand(message)},
            'decollage': {'event': (message: MessageFromDiscord) => new DiscordDecollageCommand(message)},
        };

    actionsAdmin: { [key: string]: { event: (message: MessageFromDiscord) => AbstractDiscordActionCommand } } =
        {
            't': {'event': (message: MessageFromDiscord) => new TestCommand(message)},
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
            // @todo vérifier que le user est admin
            await this.commandBus.execute(this.actionsAdmin[key].event(message));
            return;
        }


        await this.commandBus.execute(new AnswerInChannelCommand(message.message.channel,'Visiblement cette commande n\'existe pas...'));
        // Si on arrive là c'est qu'on a pas trouvé d'action correspondant à la commande
        throw new ActionNotFoundException()
    }
}
