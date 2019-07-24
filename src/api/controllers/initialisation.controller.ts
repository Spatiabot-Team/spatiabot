import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {InitialisationRepository} from "../../core/repository/initialisation.repository";
import {Initialisation} from "../../core/entity/initialisation.entity";
import {EtapeRepository} from "../../core/repository/etape.repository";
import {Monde} from "../../core/entity/monde.entity";
import {Fixture} from "../../core/fixture";

@Route('initialisation')
@Tags('Initialisation')
export class InitialisationController extends Controller {

    /**
     * Return the initialisation. If it doesn't exist, run the fixture to generate the initialisation
     * and return it
     */
    @Get()
    public async get(): Promise<Initialisation> {
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        let initialisation = await initialisationRepository.getCurrent();

        if(initialisation === null){
            initialisation = await Fixture.load();
        }

        return initialisation;
    };

    @Get('{id}')
    public async getInitialisation(id: string): Promise<Initialisation> {
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        return await initialisationRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteInitialisation(id: string) {
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        return await initialisationRepository.remove(
            initialisationRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() initialisation: Initialisation) : Promise<Initialisation> {
        ToolService.clearUndefined(initialisation);
        const initialisationRepository = getCustomRepository(InitialisationRepository);
        let initialisationToUpdate = await initialisationRepository.findOne(id);
        if (!initialisationToUpdate) {
            this.setStatus(400);
            throw new Error(`Le initialisation ${id} n'existe pas`);
        }

        Object.assign(initialisationToUpdate,initialisation);
        return await initialisationRepository.save(initialisationToUpdate);
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async post(@Body() initialisation: Initialisation): Promise<Initialisation>  {
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        return await initialisationRepository.save(initialisationRepository.create(initialisation));
    }

    @Tags('Monde')
    @SuccessResponse('201', 'Created')
    @Post('{id}/mondes')
    public async postMondes(id: string, @Body() mondes: Monde[]): Promise<Monde[]> {

        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        let initialisation = await initialisationRepository.findOne(id);

        if(!initialisation){
            this.setStatus(400);
            throw new Error(`L'initialisation ${id} n'existe pas`);
        }

        const etapeRepository = await getCustomRepository(EtapeRepository);
        const promises = mondes.map(monde => {
            monde.initialisation = initialisation;
            return etapeRepository.save(monde);
        });

        return Promise.all(promises).then((etapes) => {
            etapes.forEach(etape => delete etape.scenario);
            return Promise.resolve(etapes)
        });
    }
}
