import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {ScenarioRepository} from "../../core/repository/scenario.repository";
import {Scenario} from "../../core/entity/scenario.entity";
import {Etape} from "../../core/entity/etape.entity";
import {EtapeRepository} from "../../core/repository/etape.repository";

@Route('scenarios')
@Tags('Scenarios')
export class ScenarioController extends Controller {

    @Get()
    public async get(): Promise<Scenario[]> {
        const scenarioRepository = getCustomRepository(ScenarioRepository);
        return await scenarioRepository.find();
    };

    @Get('{id}')
    public async getScenario(id: string): Promise<Scenario> {
        const scenarioRepository = await getCustomRepository(ScenarioRepository);
        return await scenarioRepository.findOne(id);
    };

    @Delete('{id}')
    public async deleteScenario(id: string) {
        const scenarioRepository = await getCustomRepository(ScenarioRepository);
        return await scenarioRepository.remove(
            scenarioRepository.create({id: id})
        );

    };

    @SuccessResponse('201', 'Created')
    @Post()
    public async post(@Body() scenario: Scenario): Promise<Scenario>  {
        const scenarioRepository = await getCustomRepository(ScenarioRepository);
        return await scenarioRepository.save(scenario);
    }

    @SuccessResponse('201', 'Created')
    @Response('400', 'Bad request')
    @Put('{id}')
    public async update(id: string, @Body() scenario: Scenario) : Promise<Scenario> {
        ToolService.clearUndefined(scenario);
        const scenarioRepository = getCustomRepository(ScenarioRepository);
        let scenarioToUpdate = await scenarioRepository.findOne(id);
        if (!scenarioToUpdate) {
            this.setStatus(400);
            throw new Error(`Le scenario ${id} n'existe pas`);
        }

        Object.assign(scenarioToUpdate,scenario);
        return await scenarioRepository.save(scenarioToUpdate);
    }

    @Tags('Etapes')
    @SuccessResponse('201', 'Created')
    @Post('{id}/etapes')
    public async postEtapes(id: string, @Body() etapes: Etape[]): Promise<Etape[]> {

        const scenarioRepository = await getCustomRepository(ScenarioRepository);
        let scenario = await scenarioRepository.findOne(id);

        if(!scenario){
            this.setStatus(400);
            throw new Error(`Le scenario ${id} n'existe pas`);
        }

        const etapeRepository = await getCustomRepository(EtapeRepository);
        const promises = etapes.map(etape => {
            etape.scenario = scenario;
            return etapeRepository.save(etape);
        });

        return Promise.all(promises).then((etapes) => {
            etapes.forEach(etape => delete etape.scenario);
            return Promise.resolve(etapes)
        });
    }

    @Tags('Etapes')
    @SuccessResponse('201', 'Created')
    @Put('{id}/etapes')
    public async putEtapes(id: string, @Body() etapes: Etape[]): Promise<Etape[]> {

        const scenarioRepository = await getCustomRepository(ScenarioRepository);
        let scenario = await scenarioRepository.findOne(id);

        if(!scenario){
            this.setStatus(400);
            throw new Error(`Le scenario ${id} n'existe pas`);
        }

        const etapeRepository = await getCustomRepository(EtapeRepository);

        const promises = etapes.map(async etape => {

            return await etapeRepository.save({id : etape.id,order : etape.order});
        });

        return Promise.all(promises);
    }
}
