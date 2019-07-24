import {getCustomRepository} from "typeorm";
import {Route, Controller, Get, Delete, Post, Body, SuccessResponse, Response, Tags, Put} from 'tsoa';

import {ToolService} from "../../core/service/tool.service";
import {JoueurRepository} from "../../core/repository/joueur.repository";
import {Joueur} from "../../core/entity/joueur.entity";
import {Effet} from "../../core/entity/effet.entity";
import {EtapeRepository} from "../../core/repository/etape.repository";
import {EffetRepository} from "../../core/repository/effet.repository";
import {StatRepository} from "../../core/repository/stat.repository";
import {Stat} from "../../core/entity/stat.entity";

@Route('joueurs')
@Tags('Joueur')
export class JoueurController extends Controller {

    /**
     * Retourne la liste des joueurs enrgistrées
     */
    @Get()
    public async get(): Promise<Joueur[]> {
        const joueurRepository = getCustomRepository(JoueurRepository);
        return await joueurRepository.find();
    };

    /**
     * Retourne le joueur correspondant à l'id envoyé
     * @param id id de l'unité
     */
    @Get('{id}')
    public async getJoueur(id: string): Promise<Joueur> {
        const joueurRepository = await getCustomRepository(JoueurRepository);
        return await joueurRepository.findOne(id);
    };

    /**
     * Supprime l'unité correspondant à l'id envoyé
     * @param id id de l'unité à supprimer
     */
    @Delete('{id}')
    public async deleteJoueur(id: string) {
        const joueurRepository = await getCustomRepository(JoueurRepository);
        return await joueurRepository.remove(
            joueurRepository.create({id: id})
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
    public async update(id: string, @Body() unite: Joueur) : Promise<Joueur> {
        ToolService.clearUndefined(unite);
        const joueurRepository = getCustomRepository(JoueurRepository);
        let uniteToUpdate = await joueurRepository.findOne(id);
        if (!uniteToUpdate) {
            this.setStatus(400);
            throw new Error(`Le unite ${id} n'existe pas`);
        }

        Object.assign(uniteToUpdate,unite);
        return await joueurRepository.save(uniteToUpdate);
    }

    /**
     * Créer une nouvelle unité
     * @param unite Unité à créer
     */
    @SuccessResponse('201', 'Created')
    @Post()
    public async post(@Body() joueur: Joueur): Promise<Joueur>  {
        const joueurRepository = await getCustomRepository(JoueurRepository);
        return await joueurRepository.save(joueurRepository.create(joueur));
    }

    @SuccessResponse('201', 'Created')
    @Post('{id}/stats')
    public async postStats(id: string, @Body() stats: Stat[]): Promise<Stat[]>{
        ToolService.clearUndefined(stats);

        const joueurRepository = await getCustomRepository(JoueurRepository);
        let joueur = await joueurRepository.findOne(id);

        if(!joueur){
            this.setStatus(400);
            throw new Error(`Le joueur ${id} n'existe pas`);
        }

        const statRepository = await getCustomRepository(StatRepository);
        const promises = stats.map(stat => {
            stat.joueur = joueur;
            return statRepository.save(stat);
        });

        return Promise.all(promises);

    }
}
