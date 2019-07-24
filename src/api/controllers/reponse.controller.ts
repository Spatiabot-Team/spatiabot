import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {ReponseRepository} from "../../core/repository/reponse.repository";
import {Reponse} from "../../core/entity/reponse.entity";
import {ConsequencePossible} from "../../core/entity/consequence-possible.entity";
import {ConsequencePossibleRepository} from "../../core/repository/consequence-possible.repository";
import {EtapeRepository} from "../../core/repository/etape.repository";

@Route('reponses')
@Tags('Reponse')
export class ReponseController extends Controller {

    @Get('{id}')
    public async getReponse(id: string): Promise<Reponse> {
        const reponseRepository = await getCustomRepository(ReponseRepository);
        return await reponseRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteReponse(id: string) {
        const reponseRepository = await getCustomRepository(ReponseRepository);
        return await reponseRepository.remove(
            reponseRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() reponse: Reponse) : Promise<Reponse> {
        ToolService.clearUndefined(reponse);
        const reponseRepository = getCustomRepository(ReponseRepository);
        let reponseToUpdate = await reponseRepository.findOne(id);
        if (!reponseToUpdate) {
            this.setStatus(400);
            throw new Error(`Le reponse ${id} n'existe pas`);
        }

        Object.assign(reponseToUpdate,reponse);
        return await reponseRepository.save(reponseToUpdate);
    }

    @SuccessResponse('201', 'Created')
    @Post('{id}/consequence-possibles')
    public async postConsequencePossibles(id: string, @Body() consequencePossibles: ConsequencePossible[]): Promise<ConsequencePossible[]> {

        const reponseRepository = await getCustomRepository(ReponseRepository);
        let reponse = await reponseRepository.findOne(id);

        if(!reponse){
            this.setStatus(400);
            throw new Error(`La réponse ${id} n'existe pas`);
        }

        const consequencePossibleRepository = await getCustomRepository(ConsequencePossibleRepository);
        const etapeRepository = await getCustomRepository(EtapeRepository);
        const promises = consequencePossibles.map(consequencePossible => {
            consequencePossible.reponseOrigine = reponse;
            const eee = etapeRepository.findOne(consequencePossible.etapeSuivante);
            return consequencePossibleRepository.save(consequencePossible);
        });

        return Promise.all(promises);
    }
}
