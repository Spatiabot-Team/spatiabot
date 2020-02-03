<template>
    <v-container fluid grid-list-md>
        <v-layout v-if="scenario" row wrap>
            <v-flex xs12>
                <h1>
                    <span v-if="!editScenario" @dblclick="editScenario = true">{{scenario.titre}}</span>
                    <span v-if="editScenario">
                        <v-text-field @keyup.enter="updateScenarioAttr" v-model="scenarioEdit.titre" :value="scenario.titre" label="Titre" required/>
                    </span>
                    <sp-toggle :label="{on:'Actif',off:'Inactif'}" :value="scenario.actif" @input="updateScenarioActif"/>
                    <v-icon @click="editScenario=true">edit</v-icon>
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

    export default Vue.extend({
        components: {
            SpScenarioCreateForm,
            SpEtapeCreateForm,
            SpEtapeList,
            SpToggle
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
                e.preventDefault();
                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                Scenario.api().put(`/${this.scenario.id}`, {titre: this.scenario.titre, actif: this.scenario.actif})
                this.editScenario = false;
            },
        }
    });
</script>
