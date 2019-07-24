<template>
    <v-app id="inspire" :dark="isDark">

        <v-navigation-drawer v-model="showLeftPannel" fixed app>
            <v-toolbar>
                <v-toolbar-title>Scenarios</v-toolbar-title>
            </v-toolbar>
            <sp-scenario-list/>
            <hr>
            <sp-scenario-create-form/>
        </v-navigation-drawer>

        <v-toolbar fixed app>
            <v-toolbar-side-icon @click.stop="toggleLeftPannel"/>
            <v-toolbar-title>Spatiabot</v-toolbar-title>
            <span v-if="isDark" class="pa-2 grey--text darken-2--text" @click="isDark = false" style="cursor: pointer">
                <v-icon>toggle_on</v-icon> Allumer la lumière
            </span>
            <span v-if="!isDark" class="pa-2 grey--text darken-2--text" @click="isDark = true" style="cursor: pointer">
                <v-icon>toggle_off</v-icon> Eteindre la lumière
            </span>
            <v-spacer/>
            <sp-unite-modal/>
            <router-link to="/initialisation">
                <v-btn>
                    Initialisation
                </v-btn>
            </router-link>
            <router-link to="/partie">
                <v-btn>
                    Partie en cours
                </v-btn>
            </router-link>
        </v-toolbar>

        <v-content>
            <v-container fluid fill-height>
                <v-layout row wrap>
                    <v-flex xs12>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {CONFIG_ENV} from "../../../config/config";
    import SpScenarioCreateForm from './scenario/SpScenarioCreateForm.vue';
    import SpScenarioList from './scenario/SpScenarioList.vue';
    import SpScenario from './scenario/SpScenario.vue';
    import SpUniteModal from './unite/SpUniteModal.vue';
    import SpInitialisation from './initialisation/SpInitialisation.vue';
    import SpPartie from "./partie/SpPartie.vue";

    // Axios
    import axios from 'axios';

    axios.defaults.baseURL = CONFIG_ENV.api;
    axios.defaults.headers.post['Content-Type'] = "application/json";
    Vue.prototype.$http = axios;

    // Vuex
    import Vuex, {mapActions, mapGetters, mapState} from 'vuex';

    Vue.use(Vuex);
    import {store} from "../services/store.service";

    // VueRouter
    import VueRouter from 'vue-router';

    Vue.use(VueRouter);

    import "./../stylus/main.styl"

    const router = new VueRouter({
        routes: [
            {name: 'scenario', path: '/scenario/:uuid', component: SpScenario},
            {name: 'initialisation', path: '/initialisation', component: SpInitialisation},
            {name: 'partie', path: '/partie', component: SpPartie}
        ]// short for `routes: routes`
    });

    // AppComponent
    export default Vue.extend({
        store,
        router,
        async mounted() {
            this.$store.dispatch('loadScenarios');
            this.$store.dispatch('loadUnites');
        },
        components: {
            SpScenarioCreateForm,
            SpScenarioList,
            SpScenario,
            SpUniteModal,
            SpInitialisation,
            SpPartie
        },
        computed: {
            showLeftPannel: {
                get() {
                    return this.$store.state.showLeftPannel
                },
                set(value) {
                    this.$store.commit('SET_SHOW_LEFT_PANNEL', value)
                }
            }
        },
        methods: {
            ...mapActions({
                toggleLeftPannel: "toggleLeftPannel",
                setCurrentScenarioId: "setCurrentScenarioId"
            })
        },
        data: () => ({
            isDark: true
        })
    });
</script>

<style>

</style>
