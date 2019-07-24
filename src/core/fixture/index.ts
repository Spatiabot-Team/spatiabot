import {Column, createQueryBuilder, getCustomRepository, ManyToOne} from "typeorm";
import {InitialisationRepository} from "../repository/initialisation.repository";
import {MondeRepository} from "../repository/monde.repository";
import {Unite} from "../entity/unite.entity";
import {UniteRepository} from "../repository/unite.repository";
import {accessSync} from "fs";
import {Joueur} from "../entity/joueur.entity";
import {JoueurRepository} from "../repository/joueur.repository";
import {Initialisation} from "../entity/initialisation.entity";

export const Fixture =
    {

        async loadUnit() {

            // On récupère les unités déjà présentes en base

            const uniteRepository = await getCustomRepository(UniteRepository);
            const uni = await uniteRepository.find();
            let unites = uni.reduce((acc, u) => ({...acc, [u.code]: u}), {})
            let uniteRes = {
                monde: {},
                joueur: {}
            };

            // Unites MONDE
            const unitesMonde = [
                {
                    code: "pir",
                    libelle: "pirates",
                    description: "Pirates présents dans le monde"
                },
                {
                    code: "infMeg",
                    libelle: "Influence du Mégalo",
                    description: "Influence du Mégalo sur le monde"
                },
                {
                    code: "infAmb",
                    libelle: "Influence des Ambrés",
                    description: "Influence des Ambrés sur le monde"
                },
                {
                    code: "infChe",
                    libelle: "Influence de la Chevalerie",
                    description: "Influence de la Chevalerie sur le monde"
                },
                {
                    code: "infAli",
                    libelle: "Influence des Aliens",
                    description: "Influence des Aliens sur le monde"
                },
                {
                    code: "infFam",
                    libelle: "Influence de la Famille",
                    description: "Influence des Aliens sur le monde"
                }
            ];

            for (let uni of unitesMonde) {
                uniteRes.monde[uni.code] = unites[uni.code];
                if (uniteRes.monde[uni.code] == undefined) {
                    uniteRes.monde[uni.code] = await uniteRepository.save(uniteRepository.create(uni));
                }
            }

            // Unites JOUEUR

            const unitesJoueur = [
                {
                    code: "pv",
                    libelle: "Points de vie",
                    description: "Points de vie du joueur"
                },
                {
                    code: "estMeg",
                    libelle: "Estime du Mégalo",
                    description: "Estime de l'empire du Mégalo envers ce joueur"
                },
                {
                    code: "estAmb",
                    libelle: "Estime des Ambrés",
                    description: "Estime de l'empire des ambrés envers ce joueur"
                },
                {
                    code: "estChe",
                    libelle: "Estime de la Chevalerie",
                    description: "Estime de l'empire de la Chevalerie envers ce joueur"
                },
                {
                    code: "estAli",
                    libelle: "Estime des Aliens",
                    description: "Estime de l'empire des Aliens envers ce joueur"
                },
                {
                    code: "estFam",
                    libelle: "Estime de la Famille",
                    description: "Estime de l'empire de la Famille envers ce joueur"
                },

            ];

            for (let u of unitesJoueur) {
                uniteRes.joueur[u.code] = unites[u.code];
                if (uniteRes.joueur[u.code] == undefined) {
                    uniteRes.joueur[u.code] = await uniteRepository.save(uniteRepository.create(u));
                }
            }

            return uniteRes;
        },

        async load(): Promise<Initialisation> {
            console.log("Chargement des fixtures...")
            const unites = await this.loadUnit();

            const initialisationRepository = await getCustomRepository(InitialisationRepository);
            let initialisation = await initialisationRepository.getCurrent() || initialisationRepository.create({});

            // Initialisation du monde
            if (initialisation.monde === undefined || initialisation.monde === null) {
                const mondeRepository = getCustomRepository(MondeRepository);
                initialisation.monde = mondeRepository.create();
            }

            initialisation.monde.stats = [
                {quantite: 42, unite: unites.monde.pir},
                {quantite: 20, unite: unites.monde.infMeg},
                {quantite: 20, unite: unites.monde.infAmb},
                {quantite: 20, unite: unites.monde.infChe},
                {quantite: 20, unite: unites.monde.infAli},
                {quantite: 20, unite: unites.monde.infFam}
            ];

            // Initialisation du joueur
            if (initialisation.joueur === undefined || initialisation.joueur === null) {
                const joueurRepository = getCustomRepository(JoueurRepository);
                initialisation.joueur = joueurRepository.create();
            }
            initialisation.joueur.stats = [
                {quantite: 10, unite: unites.joueur.pv},
                {quantite: 0, unite: unites.joueur.estMeg},
                {quantite: 0, unite: unites.joueur.estAmb},
                {quantite: 0, unite: unites.joueur.estChe},
                {quantite: 0, unite: unites.joueur.estAli},
                {quantite: 0, unite: unites.joueur.estFam}
            ];

            // Enregistrement
            return initialisationRepository.save(initialisation);

        }
    }
