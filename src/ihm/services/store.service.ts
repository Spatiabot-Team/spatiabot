import Vuex from 'vuex';
import axios from 'axios';
import {CONFIG_ENV} from "../../../config/config";
import {arrayToSubObject, axiosGet, byId, withoutId} from "./hof.service";

axios.defaults.baseURL = CONFIG_ENV.api;
axios.defaults.headers.post['Content-Type'] = "application/json";

/**
 * Une explication de l'utilisation de vuex : https://glebbahmutov.com/blog/vue-vuex-rest-todomvx/
 * On ne doit pas avoir plus de 2 niveaux de profondeur par élément dans le state donc on doit découper
 * et utiliser les ids pour naviguer dans l'arbre des objets
 */
export const store = new Vuex.Store({
    state: {
        initialisation: null,
        partie: null,
        showLeftPannel: true,
        scenarios: [],
        currentScenarioId: "",
        /**
         *
         */
        etapes: [],
        /**
         * Les clefs sont les id des étapes du scenario et contiennent leurs réponses respectives
         * {
         *     **idEtape** : Reponse[],
         *     **otherIdEtape** : Reponse[]
         * }
         */
        reponses: {},
        consequencePossibles: {},
        effets: {},
        unites: []
    },
    mutations: {
        SET_INITIALISATION(state, value) {
            state.initialisation = value;
        },
        SET_PARTIE(state, value) {
            state.partie = value;
        },
        SET_SHOW_LEFT_PANNEL(state, value) {
            state.showLeftPannel = value;
        },
        SET_CURRENT_SCENARIO_ID(state, scenarioId) {
            state.currentScenarioId = scenarioId;
        },
        SET_SCENARIOS(state, scenarios) {
            state.scenarios = scenarios;
        },
        SET_PREMIERE_ETAPE(state, idEtape) {
            state.scenarios.find(byId(state.currentScenarioId)).premiere_etape = idEtape;
        },
        ADD_SCENARIO(state, scenario) {
            state.scenarios.push(scenario);
        },
        REMOVE_SCENARIO(state, id) {
            state.scenarios = state.scenarios.filter(withoutId(id));
        },

        // Etapes
        SET_ETAPES(state, etapes) {
            state.etapes = etapes;
        },
        ADD_ETAPE(state, etape) {
            state.etapes.push(etape);
            state.reponses[etape.id] = etape.reponses || [];
        },
        REMOVE_ETAPE(state, etapeId) {
            state.etapes = state.etapes.filter(withoutId(etapeId));
        },

        // Reponses
        SET_REPONSES(state, reponses) {
            state.reponses = reponses;
        },
        ADD_REPONSE(state, {idEtape, reponse}) {
            if (undefined === state.reponses[idEtape]) {
                state.reponses[idEtape] = [];
            }
            state.reponses[idEtape].push(reponse);
        },
        REMOVE_REPONSE(state, reponseId) {
            for (const i in state.reponses) {
                state.reponses[i] = state.reponses[i].filter(withoutId(reponseId))
            }
        },

        // Consequence Possibles
        SET_CONSEQUENCE_POSSIBLES(state, consequencePossibles) {
            state.consequencePossibles = consequencePossibles;
        },
        ADD_CONSEQUENCE_POSSIBLE(state, {idReponse, consequencePossible}) {
            if (undefined === state.consequencePossibles[idReponse]) {
                state.consequencePossibles[idReponse] = [];
            }
            state.consequencePossibles[idReponse].push(consequencePossible);
        },
        REMOVE_CONSEQUENCE_POSSIBLE(state, consequencePossibleId) {
            for (const i in state.consequencePossibles) {
                state.consequencePossibles[i] = state.consequencePossibles[i].filter(withoutId(consequencePossibleId))
            }
        },

        // Effets
        SET_EFFETS(state, effets) {
            state.effets = effets;
        },
        ADD_EFFET(state, {idEtape, effet}) {
            if (undefined === state.effets[idEtape]) {
                state.effets[idEtape] = [];
            }
            state.effets[idEtape].push(effet);
        },
        REMOVE_EFFET(state, effetId) {
            for (const i in state.effets) {
                state.effets[i] = state.effets[i].filter(withoutId(effetId))
            }
        },

        // Unites
        SET_UNITES(state, unites) {
            state.unites = unites;
        },
        ADD_UNITE(state, unite) {
            state.unites.push(unite);
        },
        REMOVE_UNITE(state, id) {
            state.unites = state.unites.filter(withoutId(id));
        },

        // Stats
        REMOVE_STATS_INIT_JOUEUR(state, {id}) {
            state.initialisation.joueur.stats = state.initialisation.joueur.stats.filter(withoutId(id));
        },
        REMOVE_STATS_INIT_MONDE(state, {id}) {
            state.initialisation.monde.stats = state.initialisation.monde.stats.filter(withoutId(id));
        },
        REMOVE_STATS_JOUEUR(state, {id, ownerId}) {
            state.partie.joueurs.find(byId(ownerId)).stats = state.partie.joueurs.find(byId(ownerId)).stats.filter(withoutId(id));
        },
        REMOVE_STATS_MONDE(state, {id}) {
            state.partie.monde.stats = state.partie.monde.stats.filter(withoutId(id));
        },
        ADD_STATS_INIT_JOUEUR(state, {stats}) {
            state.initialisation.joueur.stats = state.initialisation.joueur.stats.concat(stats);
        },
        ADD_STATS_INIT_MONDE(state, {stats}) {
            state.initialisation.monde.stats = state.initialisation.monde.stats.concat(stats);
        },
        ADD_STATS_JOUEUR(state, {stats, ownerId}) {
            state.partie.joueurs.find(byId(ownerId)).stats = state.partie.joueurs.find(byId(ownerId)).stats.concat(stats);
        },
        ADD_STATS_MONDE(state, {stats}) {
            state.partie.monde.stats = state.partie.monde.stats.concat(stats);
        }

    },
    getters: {

        getInitialisation: (state) => state.initialisation,
        getPartie: (state) => state.partie || {},
        getCurrentScenario: state => state.scenarios.find(byId(state.currentScenarioId)),
        getScenarios: state => state.scenarios,
        getEtapes: state => state.etapes || [],
        getReponses: state => etapeId => state.reponses[etapeId] || [],
        getConsequencePossibles: state => reponseId => state.consequencePossibles[reponseId] || [],
        getEffets: state => etapeId => state.effets[etapeId] || [],
        getUnites: state => state.unites,
        getUniteById: state => uniteId => state.unites.find(byId(uniteId)),
        getEtapeById: state => etapeId => state.etapes.find(byId(etapeId)),
        isShowLeftPannel: state => state.showLeftPannel
    },
    actions: {
        toggleLeftPannel({commit, state, getters}) {
            commit('SET_SHOW_LEFT_PANNEL', !getters.isShowLeftPannel);
        },
        async loadInitialisation({commit, state}, force = false) {
            if (!force && state.initialisation) return;
            return axiosGet('initialisation', commit, 'SET_INITIALISATION')
        },
        createScenario({commit}, scenario) {
            axios.post('scenarios', scenario)
                .then(({data}) => {
                    commit('ADD_SCENARIO', data);
                    commit('SET_CURRENT_SCENARIO_ID', data.id);

                }).catch(console.error);
        },
        updateScenario({state, commit}, scenario) {
            if(scenario.premiere_etape){
                commit('SET_PREMIERE_ETAPE', scenario.premiere_etape)
            }
            axios.put('scenarios/' + state.currentScenarioId, scenario)
            //.then(({data}) => commit('SET_ETAPE', data))
                .catch(console.error);
        },
        removeScenario({commit}, id) {
            axios.delete('scenarios/' + id)
                .then(({data}) => commit('REMOVE_SCENARIO', id))
                .catch(console.error);
        },

        // Etapes
        createEtape({commit, state}, etape) {
            axios.post('scenarios/' + state.currentScenarioId + '/etapes', [etape])
                .then(({data}) => {
                    for (const etape of data) {
                        commit('ADD_ETAPE', etape)
                    }
                })
                .catch(console.error);
        },
        updateEtape({state, commit}, etape) {
            axios.put('etapes/' + etape.id, etape)
            //.then(({data}) => commit('SET_ETAPE', data))
                .catch(console.error);
        },
        removeEtape({commit}, id) {
            axios.delete('etapes/' + id)
                .then(({data}) => commit('REMOVE_ETAPE', id))
                .catch(console.error);
        },
        saveOrderEtape({commit, state}, etapes) {
            etapes.forEach((e, index) => e.order = index);
            commit('SET_ETAPES', etapes)
            axios.put('scenarios/' + state.currentScenarioId + '/etapes', etapes)
                .catch(console.error);
        },

        // Reponse
        createReponse({commit, state}, {idEtape, reponse}) {
            axios.post('etapes/' + idEtape + '/reponses', [reponse])
                .then(({data}) => {
                    for (const rep of data) {
                        commit('ADD_REPONSE', {idEtape, reponse:rep})
                    }
                })
                .catch(console.error);
        },
        updateReponse({state, commit}, reponse) {
            axios.put('reponses/' + reponse.id, reponse)
            //.then(({data}) => commit('SET_ETAPE', data))
                .catch(console.error);
        },
        removeReponse({commit}, id) {
            axios.delete('reponses/' + id)
                .then(({data}) => commit('REMOVE_REPONSE', id))
                .catch(console.error);
        },

        // ConsequencePossible
        createConsequencePossible({commit, state}, {idReponse, consequencePossible}) {
            axios.post('reponses/' + idReponse + '/consequence-possibles', [consequencePossible])
                .then(({data}) => {
                    for (const consequencePossible of data) {
                        commit('ADD_CONSEQUENCE_POSSIBLE', {idReponse, consequencePossible})
                    }
                })
                .catch(console.error);
        },
        updateConsequencePossible({state, commit}, consequencePossible) {
            delete consequencePossible.etapeSuivanteId;
            axios.put('consequence-possibles/' + consequencePossible.id, consequencePossible)
            //.then(({data}) => commit('SET_ETAPE', data))
                .catch(console.error);
        },
        removeConsequencePossible({commit}, id) {
            axios.delete('consequence-possibles/' + id)
                .then(({data}) => commit('REMOVE_CONSEQUENCE_POSSIBLE', id))
                .catch(console.error);
        },

        // Effet
        createEffet({commit, state}, {idEtape, effet}) {
            axios.post('etapes/' + idEtape + '/effets', [effet])
                .then(({data}) => {
                    for (const effet of data) {
                        commit('ADD_EFFET', {idEtape, effet})
                    }
                })
                .catch(console.error);
        },
        updateEffet({state, commit}, effet) {
            axios.put('effets/' + effet.id, effet)
            //.then(({data}) => commit('SET_EFFET', data))
                .catch(console.error);
        },
        removeEffet({commit}, id) {
            axios.delete('effets/' + id)
                .then(({data}) => commit('REMOVE_EFFET', id))
                .catch(console.error);
        },

        // Unite
        loadUnites({commit, state}, force = false) {
            if (!force && state.unites.length !== 0) return;
            axios.get('unites')
                .then(({data}) => commit('SET_UNITES', data))
                .catch(console.error);
        },
        createUnite({commit}, unite) {
            axios.post('unites', unite)
                .then(({data}) => {
                    commit('ADD_UNITE', data);

                }).catch(console.error);
        },
        updateUnite({state, commit}, unite) {
            axios.put('unites/' + unite.id, unite)
            //.then(({data}) => commit('SET_UNITE', data))
                .catch(console.error);
        },
        removeUnite({commit}, id) {
            axios.delete('unites/' + id)
                .then(({data}) => commit('REMOVE_UNITE', id))
                .catch(console.error);
        },

        // Stat
        createStatInitJoueur: ({commit}, {stat, id}) => {
            return axios.post(`joueurs/${id}/stats`, [stat])
                .then(({data}) => commit('ADD_STATS_INIT_JOUEUR', {stats: data}))
                .catch(console.error)
        },
        createStatInitMonde: ({commit}, {stat, id}) => {
            return axios.post(`mondes/${id}/stats`, [stat])
                .then(({data}) => commit('ADD_STATS_INIT_MONDE', {stats: data}))
                .catch(console.error)
        },
        createStatJoueur: ({commit}, {stat, id}) => {
            return axios.post(`joueurs/${id}/stats`, [stat])
                .then(({data}) => commit('ADD_STATS_JOUEUR', {stats: data, ownerId: id}))
                .catch(console.error)
        },
        createStatMonde: ({commit}, {stat, id}) => {
            return axios.post(`mondes/${id}/stats`, [stat])
                .then(({data}) => commit('ADD_STATS_MONDE', {stats: data}))
                .catch(console.error)
        },
        updateStat: ({commit}, stat) => axios.put('stats/' + stat.id, stat).catch(console.error),
        removeStat: ({commit}, {id, mutation, ownerId}) => {
            return axios.delete('stats/' + id)
                .then(data => {
                    commit(mutation, {id, ownerId})
                })
                .catch(console.error)
        },

    }
});
