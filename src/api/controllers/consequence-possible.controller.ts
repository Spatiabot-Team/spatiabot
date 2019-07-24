import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {ConsequencePossibleRepository} from "../../core/repository/consequence-possible.repository";
import {ConsequencePossible} from "../../core/entity/consequence-possible.entity";

@Route('consequence-possibles')
@Tags('ConsequencePossible')
export class ConsequencePossibleController extends Controller {

    @Get('{id}')
    public async getConsequencePossible(id: string): Promise<ConsequencePossible> {
        const consequencePossibleRepository = await getCustomRepository(ConsequencePossibleRepository);
        return await consequencePossibleRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteConsequencePossible(id: string) {
        const consequencePossibleRepository = await getCustomRepository(ConsequencePossibleRepository);
        return await consequencePossibleRepository.remove(
            consequencePossibleRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() consequencePossible: ConsequencePossible) : Promise<ConsequencePossible> {

        ToolService.clearUndefined(consequencePossible);
        const consequencePossibleRepository = getCustomRepository(ConsequencePossibleRepository);
        let consequencePossibleToUpdate = await consequencePossibleRepository.findOne(id);
        if (!consequencePossibleToUpdate) {
            this.setStatus(400);
            throw new Error(`Le consequencePossible ${id} n'existe pas`);
        }

        Object.assign(consequencePossibleToUpdate,consequencePossible);
        return await consequencePossibleRepository.save(consequencePossibleToUpdate);
    }
}
