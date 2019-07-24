import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {EffetRepository} from "../../core/repository/effet.repository";
import {Effet} from "../../core/entity/effet.entity";

@Route('effets')
@Tags('Effet')
export class EffetController extends Controller {

    @Get('{id}')
    public async getEffet(id: string): Promise<Effet> {
        const effetRepository = await getCustomRepository(EffetRepository);
        return await effetRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteEffet(id: string) {
        const effetRepository = await getCustomRepository(EffetRepository);
        return await effetRepository.remove(
            effetRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() effet: Effet) : Promise<Effet> {
        ToolService.clearUndefined(effet);
        const effetRepository = getCustomRepository(EffetRepository);
        let effetToUpdate = await effetRepository.findOne(id);
        if (!effetToUpdate) {
            this.setStatus(400);
            throw new Error(`Le effet ${id} n'existe pas`);
        }

        Object.assign(effetToUpdate,effet);
        return await effetRepository.save(effetToUpdate);
    }
}
