import {MondeAddAuteurCommand} from "./monde/monde.add-auteur.command";
import {MondeAddAuteurHandler} from "./monde/monde.add-auteur.handler";
import {MondeCreateCommand} from "./monde/monde.create.command";
import {MondeCreateHandler} from "./monde/monde.create.handler";
import {MondeDeleteAuteurCommand} from "./monde/monde.delete-auteur.command";
import {MondeDeleteAuteurHandler} from "./monde/monde.delete-auteur.handler";
import {MondeDeleteCommand} from "./monde/monde.delete.command";
import {MondeDeleteHandler} from "./monde/monde.delete.handler";
import {MondeStatDeleteCommand} from "./monde/monde.stat.delete.command";
import {MondeStatDeleteHandler} from "./monde/monde.stat.delete.handler";
import {MondeStatUpdateCommand} from "./monde/monde.stat.update.command";
import {MondeStatUpdateHandler} from "./monde/monde.stat.update.handler";
import {MondeUpdateCommand} from "./monde/monde.update.command";
import {MondeUpdateHandler} from "./monde/monde.update.handler";

export const CommandHandlers = [
    // Monde
    MondeAddAuteurCommand,
    MondeAddAuteurHandler,
    MondeCreateCommand,
    MondeCreateHandler,
    MondeDeleteAuteurCommand,
    MondeDeleteAuteurHandler,
    MondeDeleteCommand,
    MondeDeleteHandler,
    MondeStatDeleteCommand,
    MondeStatDeleteHandler,
    MondeStatUpdateCommand,
    MondeStatUpdateHandler,
    MondeUpdateCommand,
    MondeUpdateHandler,
];