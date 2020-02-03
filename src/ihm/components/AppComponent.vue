<template>
    <v-app id="inspire" :dark="!lightOn">

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
            <sp-toggle :label="{on:'Eteindre la lumière',off:'Allumer la lumière'}" v-model="lightOn" />
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
    import SpToggle from './tools/SpToggle.vue';
    import SpUniteModal from './unite/SpUniteModal.vue';
    import SpInitialisation from './initialisation/SpInitialisation.vue';
    import SpPartie from "./partie/SpPartie.vue";
    import store from "../plugins/store";

    // VueRouter
    import VueRouter from 'vue-router';

    Vue.use(VueRouter);

    import "./../stylus/main.styl"
    import Scenario from "../models/Scenario";
    import {mapActions} from "vuex";

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
            Scenario.api().get('');
            // this.$store.dispatch('loadUnites');
        },
        components: {
            SpScenarioCreateForm,
            SpScenarioList,
            SpScenario,
            SpUniteModal,
            SpInitialisation,
            SpPartie,
            SpToggle
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
            })
        },
        data: () => ({
            lightOn: false
        })
    });
</script>

<style>

</style>
