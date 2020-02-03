import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios'

import ConsequencePossible from "../models/ConsequencePossible";
import Effet from "../models/Effet";
import Etape from "../models/Etape";
import Monde from "../models/Monde";
import Reponse from "../models/Reponse";
import Scenario from "../models/Scenario";
import Stat from "../models/Stat"
import Unite from "../models/Unite";

import {CONFIG_ENV} from "../../../config/config";


axios.defaults.baseURL = CONFIG_ENV.api;
axios.defaults.headers.post['Content-Type'] = "application/json";
Vue.prototype.$http = axios;

Vue.use(Vuex)
VuexORM.use(VuexORMAxios, { axios });

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(ConsequencePossible);
database.register(Effet);
database.register(Etape);
database.register(Monde);
database.register(Reponse);
database.register(Scenario);
database.register(Stat);
database.register(Unite);

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
    plugins: [VuexORM.install(database)],
    state: {
        showLeftPannel: false
    },
    getters : {
        isShowLeftPannel: state => state.showLeftPannel
    },
    mutations: {
        SET_SHOW_LEFT_PANNEL(state, value) {
            state.showLeftPannel = value;
        }
    },
    actions: {
        toggleLeftPannel({commit, state, getters}) {
            commit('SET_SHOW_LEFT_PANNEL', !getters.isShowLeftPannel);
        }
    }
})

export default store;
