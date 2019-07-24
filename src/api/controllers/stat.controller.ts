import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {StatRepository} from "../../core/repository/stat.repository";
import {Stat} from "../../core/entity/stat.entity";

@Route('stats')
@Tags('Stat')
export class StatController extends Controller {

    @Get('{id}')
    public async getStat(id: string): Promise<Stat> {
        const statRepository = await getCustomRepository(StatRepository);
        return await statRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteStat(id: string) {
        const statRepository = await getCustomRepository(StatRepository);
        return await statRepository.remove(
            statRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() stat: Stat) : Promise<Stat> {
        ToolService.clearUndefined(stat);
        const statRepository = getCustomRepository(StatRepository);
        let statToUpdate = await statRepository.findOne(id);
        if (!statToUpdate) {
            this.setStatus(400);
            throw new Error(`La stat ${id} n'existe pas`);
        }

        Object.assign(statToUpdate,stat);
        return await statRepository.save(statToUpdate);
    }
}
