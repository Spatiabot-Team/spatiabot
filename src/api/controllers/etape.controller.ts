import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {EtapeRepository} from "../../core/repository/etape.repository";
import {Etape} from "../../core/entity/etape.entity";
import {Reponse} from "../../core/entity/reponse.entity";
import {ReponseRepository} from "../../core/repository/reponse.repository";
import {Effet} from "../../core/entity/effet.entity";
import {EffetRepository} from "../../core/repository/effet.repository";

@Route('etapes')
@Tags('Etapes')
export class EtapeController extends Controller {

    @Get('{id}')
    public async getEtape(id: string): Promise<Etape> {
        const etapeRepository = await getCustomRepository(EtapeRepository);
        return await etapeRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteEtape(id: string) {
        const etapeRepository = await getCustomRepository(EtapeRepository);
        return await etapeRepository.remove(
            etapeRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() etape: Etape) : Promise<Etape> {
        ToolService.clearUndefined(etape);
        delete etape.reponses;
        delete etape.consequencePossibleOrigines;
        const etapeRepository = getCustomRepository(EtapeRepository);
        let etapeToUpdate = await etapeRepository.findOne(id);
        if (!etapeToUpdate) {
            this.setStatus(400);
            throw new Error(`L'étape ${id} n'existe pas`);
        }

        Object.assign(etapeToUpdate,etape);
        console.log(etapeToUpdate.titre);
        return await etapeRepository.save(etapeToUpdate);
    }

    @SuccessResponse('201', 'Created')
    @Post('{id}/reponses')
    public async postReponses(id: string, @Body() reponses: Reponse[]): Promise<Reponse[]> {

        const etapeRepository = await getCustomRepository(EtapeRepository);
        let etape = await etapeRepository.findOne(id);

        if(!etape){
            this.setStatus(400);
            throw new Error(`L'etape ${id} n'existe pas`);
        }

        const reponseRepository = await getCustomRepository(ReponseRepository);
        const promises = reponses.map(reponse => {
            reponse.etape = etape;
            return reponseRepository.save(reponse);
        });

        return Promise.all(promises).then(reponses => {
            reponses.forEach(reponse => delete reponse.etape);
            return Promise.resolve(reponses)
        });

    }

    @SuccessResponse('201', 'Created')
    @Post('{id}/effets')
    public async postEffets(id: string, @Body() effets: Effet[]): Promise<Effet[]>{
        ToolService.clearUndefined(effets);

        const etapeRepository = await getCustomRepository(EtapeRepository);
        let etape = await etapeRepository.findOne(id);

        if(!etape){
            this.setStatus(400);
            throw new Error(`L'étape ${id} n'existe pas`);
        }

        const effetRepository = await getCustomRepository(EffetRepository);
        const promises = effets.map(effet => {
            effet.etapeOrigine = etape;
            return effetRepository.save(effet);
        });

        return Promise.all(promises);

    }
}
