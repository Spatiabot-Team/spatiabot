import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {UniteRepository} from "../../core/repository/unite.repository";
import {Unite, UniteRequest} from "../../core/entity/unite.entity";

@Route('unites')
@Tags('Unite')
export class UniteController extends Controller {

    /**
     * Retourne la liste des unités enrgistrées
     */
    @Get()
    public async get(): Promise<Unite[]> {
        const uniteRepository = getCustomRepository(UniteRepository);
        return await uniteRepository.find();
    };

    /**
     * Retourne l'unité correspondant à l'id envoyé
     * @param id id de l'unité
     */
    @Get('{id}')
    public async getUnite(id: string): Promise<Unite> {
        const uniteRepository = await getCustomRepository(UniteRepository);
        return await uniteRepository.findOne(id);
    };

    /**
     * Supprime l'unité correspondant à l'id envoyé
     * @param id id de l'unité à supprimer
     */
    @Delete('{id}')
    public async deleteUnite(id: string) {
        const uniteRepository = await getCustomRepository(UniteRepository);
        return await uniteRepository.remove(
            uniteRepository.create({id: id})
        );

    };

    /**
     * Modifie l'unité correspondant à l'id envoyé
     * @param id id de l'unité à modifier
     * @param unite Valeurs de l'unité à modifier
     */
    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() unite: Unite) : Promise<Unite> {
        ToolService.clearUndefined(unite);
        const uniteRepository = getCustomRepository(UniteRepository);
        let uniteToUpdate = await uniteRepository.findOne(id);
        if (!uniteToUpdate) {
            this.setStatus(400);
            throw new Error(`Le unite ${id} n'existe pas`);
        }

        Object.assign(uniteToUpdate,unite);
        return await uniteRepository.save(uniteToUpdate);
    }

    /**
     * Créer une nouvelle unité
     * @param unite Unité à créer
     */
    @SuccessResponse('201', 'Created')
    @Post()
    public async post(@Body() uniteRequest: UniteRequest): Promise<Unite>  {
        const uniteRepository = await getCustomRepository(UniteRepository);
        return await uniteRepository.save(uniteRepository.create(uniteRequest));
    }
}
