import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {MondeRepository} from "../../core/repository/monde.repository";
import {Monde} from "../../core/entity/monde.entity";
import {Stat} from "../../core/entity/stat.entity";
import {JoueurRepository} from "../../core/repository/joueur.repository";
import {StatRepository} from "../../core/repository/stat.repository";

@Route('mondes')
@Tags('Monde')
export class MondeController extends Controller {

    /**
     * Retourne la liste des unités enrgistrées
     */
    @Get()
    public async get(): Promise<Monde[]> {
        const mondeRepository = getCustomRepository(MondeRepository);
        return await mondeRepository.find();
    };

    /**
     * Retourne l'unité correspondant à l'id envoyé
     * @param id id de l'unité
     */
    @Get('{id}')
    public async getMonde(id: string): Promise<Monde> {
        const mondeRepository = await getCustomRepository(MondeRepository);
        return await mondeRepository.findOne(id);
    };

    /**
     * Supprime l'unité correspondant à l'id envoyé
     * @param id id de l'unité à supprimer
     */
    @Delete('{id}')
    public async deleteMonde(id: string) {
        const mondeRepository = await getCustomRepository(MondeRepository);
        return await mondeRepository.remove(
            mondeRepository.create({id: id})
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
    public async update(id: string, @Body() unite: Monde) : Promise<Monde> {
        ToolService.clearUndefined(unite);
        const mondeRepository = getCustomRepository(MondeRepository);
        let uniteToUpdate = await mondeRepository.findOne(id);
        if (!uniteToUpdate) {
            this.setStatus(400);
            throw new Error(`Le unite ${id} n'existe pas`);
        }

        Object.assign(uniteToUpdate,unite);
        return await mondeRepository.save(uniteToUpdate);
    }

    /**
     * Créer une nouvelle unité
     * @param unite Unité à créer
     */
    @SuccessResponse('201', 'Created')
    @Post()
    public async post(@Body() monde: Monde): Promise<Monde>  {
        const mondeRepository = await getCustomRepository(MondeRepository);
        return await mondeRepository.save(mondeRepository.create(monde));
    }


    @SuccessResponse('201', 'Created')
    @Post('{id}/stats')
    public async postStats(id: string, @Body() stats: Stat[]): Promise<Stat[]>{
        ToolService.clearUndefined(stats);

        const mondeRepository = await getCustomRepository(MondeRepository);
        let monde = await mondeRepository.findOne(id);

        if(!monde){
            this.setStatus(400);
            throw new Error(`Le monde ${id} n'existe pas`);
        }

        const statRepository = await getCustomRepository(StatRepository);
        const promises = stats.map(stat => {
            stat.monde = monde;
            return statRepository.save(stat);
        });

        return Promise.all(promises);

    }
}
