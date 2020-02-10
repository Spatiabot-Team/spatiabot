<template>
    <v-container fluid grid-list-md>
        <v-layout v-if="scenario" row wrap>
            <v-flex xs12>
                <h1>
                    <sp-text-editable v-model="scenario.titre" ref="scenarioTitre" label="Titre" @save="updateScenarioAttr" solo rounded/>
                    <sp-toggle :label="{on:'Actif',off:'Inactif'}" :value="scenario.actif" @input="updateScenarioActif"/>
                    <v-icon @click="$refs.scenarioTitre.edit()">edit</v-icon>
                </h1>
            </v-flex>
            <v-flex xs12>
                <sp-etape-list :etapes="scenario.etapes"/>
            </v-flex>
            <v-flex xs12>
                <v-divider/>
                <v-subheader>Ajouter une étape</v-subheader>
                <sp-etape-create-form :id-scenario="scenario.id"/>
            </v-flex>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs12><h1>Créer un scenario</h1></v-flex>
            <v-flex xs12>
                <sp-scenario-create-form/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpEtapeCreateForm from "../etape/SpEtapeCreateForm.vue";
    import SpEtapeList from "../etape/SpEtapeList.vue";
    import SpToggle from "../tools/SpToggle";
    import SpScenarioCreateForm from './SpScenarioCreateForm.vue';
    import Scenario from "../../models/Scenario";
    import SpTextEditable from "../tools/SpTextEditable";

    export default Vue.extend({
        components: {
            SpScenarioCreateForm,
            SpEtapeCreateForm,
            SpEtapeList,
            SpToggle,
            SpTextEditable
        },
        async mounted() {
            await Scenario.api().get('/' + this.$route.params.uuid);
        },
        computed: {
            scenario(){
                return Scenario.findDeep(this.$route.params.uuid);
            }
        },
        data() {
            return {
                editScenario: false,
                scenarioEdit: {}
            }
        },
        methods: {
            updateScenarioActif(value) {
                Scenario.edit(this.scenario.id,{actif: value});
            },
            updateScenarioAttr(e) {
                Scenario.api().put(`/${this.scenario.id}`, {titre: this.scenario.titre, actif: this.scenario.actif})
            },
        }
    });
</script>
