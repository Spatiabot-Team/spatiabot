import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeAddAuteurCommand} from "./monde.add-auteur.command";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {UserRepositoryInterface} from "../../../../USER/application/repositories/user.repository.interface";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {UserRepository} from "../../../../USER/infrastructure/database/repositories/user.repository";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {UserNotFoundException} from "../../../domain/exceptions/auteur/user-not-found.exception";
import {Monde} from "../../../domain/entities/monde";
import {MondeNotFoundException} from "../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {
    MondeHasAlreadyThisAuteurException
} from "../../../domain/exceptions/monde/monde-has-already-this-auteur.exception";

@CommandHandler(MondeAddAuteurCommand)
export class MondeAddAuteurHandler implements IQueryHandler<MondeAddAuteurCommand> {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface
    ) {
    }

    /**
     *
     * @param query MondeAddAuteurCommand
     * @throws MondeNotFoundException
     * @throws MondeHasNotThisAuteurException
     * @throws MondeHasAlreadyThisAuteurException
     */
    async execute(query: MondeAddAuteurCommand): Promise<MondeInterface> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));
        this.verify(mondeFound,query);

        const user = await this.userRepository.findOne(query.auteurId);
        if(!user){
            throw new UserNotFoundException();
        }

        mondeFound.addAuteurId(query.auteurToAddId)

        return this.repository.save({id: mondeFound.id, auteurIds: mondeFound.auteurIds});
    }

    verify(mondeFound : Monde,query: MondeAddAuteurCommand){
        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        /** L'auteur qui veut ajouter un auteur doit être auteur de ce monde */
        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        /** L'auteur à ajouter ne doit pas déjà être dans ce monde */
        if (mondeFound.hasAuteur(query.auteurToAddId)) {
            throw new MondeHasAlreadyThisAuteurException();
        }
    }
}
