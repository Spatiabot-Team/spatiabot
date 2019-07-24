import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {PartieRepository} from "../../core/repository/partie.repository";
import {Partie} from "../../core/entity/partie.entity";
import {EtapeRepository} from "../../core/repository/etape.repository";
import {Monde} from "../../core/entity/monde.entity";
import {Fixture} from "../../core/fixture";
import {JeuService} from "../../core/service/jeu.service";

@Route('parties')
@Tags('Partie')
export class PartieController extends Controller {

    /**
     * Return the partie. If it doesn't exist, run the fixture to generate the partie
     * and return it
     */
    @Get()
    public async get(): Promise<Partie> {
        return await JeuService.start();
    };

    @Get('{id}')
    public async getPartie(id: string): Promise<Partie> {
        const partieRepository = await getCustomRepository(PartieRepository);
        return await partieRepository.findOne(id);
    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() partie: Partie) : Promise<Partie> {
        ToolService.clearUndefined(partie);
        const partieRepository = getCustomRepository(PartieRepository);
        let partieToUpdate = await partieRepository.findOne(id);
        if (!partieToUpdate) {
            this.setStatus(400);
            throw new Error(`Le partie ${id} n'existe pas`);
        }

        Object.assign(partieToUpdate,partie);
        return await partieRepository.save(partieToUpdate);
    }
}
