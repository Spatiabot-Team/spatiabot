<template>
    <v-container fluid grid-list-md>
        <v-layout v-if="scenario" row wrap>
            <v-flex xs12 v-if="!editScenario" @dblclick="editScenario = true">
                <h1>{{scenario.titre}}
                    <v-icon @click="editScenario=true">edit</v-icon>
                </h1>
            </v-flex>
            <v-flex xs12 v-if="editScenario">
                <div class="col">
                    <v-text-field @keyup.enter="updateScenarioTitre" v-model="scenario.titre" label="Titre" required
                                  width="100%"/>
                </div>
                <div class="col">
                    <v-btn color="success" @click="updateScenarioTitre" type="button">Ok</v-btn>
                </div>
            </v-flex>
            <v-flex xs12>
                <sp-etape-list/>
            </v-flex>
            <v-flex xs12>
                <v-divider/>
                <v-subheader>Ajouter une étape</v-subheader>
                <sp-etape-create-form/>
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
    import {mapActions, mapGetters} from "vuex";
    import SpScenarioCreateForm from './SpScenarioCreateForm.vue';

    export default Vue.extend({
        async mounted() {
            await this.loadScenarios();
            this.setCurrentScenarioId(this.$route.params.uuid)
        },
        components: {
            SpScenarioCreateForm,
            SpEtapeCreateForm,
            SpEtapeList
        },
        computed: {
            ...mapGetters({
                scenario: "getCurrentScenario"
            })
        },
        data: () => ({
            editScenario: false
        }),
        methods: {
            ...mapActions({
                loadScenarios: "loadScenarios",
                updateScenario: "updateScenario",
                setCurrentScenarioId: "setCurrentScenarioId"
            }),
            updateScenarioTitre(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;
                //this.$http.put('etapes/' + this.etape.id, this.etape).then(() => this.edit = false);
                this.updateScenario({titre: this.scenario.titre});
                this.editScenario = false;
            },
        }
    });
</script>
