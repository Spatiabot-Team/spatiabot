import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";
import {UserRepository} from "../../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../../USER/application/repositories/user.repository.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeAddAuteurCommand} from "../../impl/monde/monde.add-auteur.command";
import {MondeHasAlreadyThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-already-this-auteur.exception";
import {UserNotFoundException} from "../../../../domain/exceptions/auteur/user-not-found.exception";

@CommandHandler(MondeAddAuteurCommand)
export class MondeAddAuteurHandler implements IQueryHandler<MondeAddAuteurCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    /**
     *
     * @param query MondeAddAuteurCommand
     * @throws MondeDoesntExistException
     * @throws MondeHasNotThisAuteurException
     * @throws MondeHasAlreadyThisAuteurException
     */
    async execute(query: MondeAddAuteurCommand): Promise<MondeInterface> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.mondeId));
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
            throw new MondeDoesntExistException();
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
