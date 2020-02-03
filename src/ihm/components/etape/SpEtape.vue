<template>
    <div class="etape">
        <v-card>
            <v-toolbar>
                <v-toolbar-title v-if="!editEtape" md-toolbar-row>

                    <sp-toggle icon="visibility" v-model="showContent"/>
                    <sp-text-editable v-model="etape.titre" ref="etapeTitre" label="Titre" @save="update" solo rounded/>

                    <v-icon small @click="edit">edit</v-icon>
                    <v-icon small @click="deleteEtape(etape)">delete_forever</v-icon>

                    <sp-toggle :label="{on:'Première étape',off:'Activer comme première étape'}"
                               :value="isPremiereEtape"
                               icon="radio"
                               @input="setPremiereEtape"
                               class="caption"
                               :small="true"
                    />

                    <sp-checkbox :label="{on:'Fin du scénario',off:'Fin du scénario'}"
                                 v-model="etape.finScenario"
                                 @input="update"
                                 class="caption"
                                 :small="true"
                    />
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text v-if="showContent">
                <v-flex class="pa-4">
                    <sp-textarea-editable
                        ref="etapeTexte"
                        v-model="etape.texte"
                        name="texte"
                        label="Texte"
                        rows="10"
                        @save="update"
                    />
                </v-flex>

                <v-divider></v-divider>

                <v-flex>
                    <v-subheader>Effets
                        <v-icon small right @click="showEffetForm=!showEffetForm">add_circle</v-icon>
                    </v-subheader>
                    <sp-effet-create-form v-if="showEffetForm" :id-etape="etape.id" @created="showEffetForm=false"/>
                    <sp-effet-list :id-etape="etape.id" :effets="etape.effets"/>
                </v-flex>

                <v-divider></v-divider>

                <v-flex>
                    <v-subheader>Réponses
                        <v-icon small right @click="showCreateReponseForm=!showCreateReponseForm">add_circle</v-icon>
                    </v-subheader>
                    <sp-reponse-list v-if="etape.reponses" :reponses="etape.reponses"/>
                    <sp-reponse-create-form v-if="showCreateReponseForm" :id-etape="etape.id"/>
                </v-flex>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    import SpReponseList from '../reponse/SpReponseList.vue';
    import SpReponseCreateForm from '../reponse/SpReponseCreateForm.vue';
    import SpEffetCreateForm from '../effet/SpEffetCreateForm.vue';
    import SpEffetList from "../effet/SpEffetList.vue";
    import Scenario from "../../models/Scenario";
    import Etape from "../../models/Etape";
    import SpTextareaEditable from '../tools/SpTextareaEditable.vue';
    import SpTextEditable from '../tools/SpTextEditable.vue';
    import SpToggle from '../tools/SpToggle.vue';
    import SpCheckbox from '../tools/SpCheckbox.vue';

    export default Vue.extend({
        props: {
            etape: {
                required: true
            }
        },
        components: {
            SpReponseList,
            SpReponseCreateForm,
            SpEffetCreateForm,
            SpEffetList,
            SpTextareaEditable,
            SpTextEditable,
            SpToggle,
            SpCheckbox
        },
        computed: {
            scenario() {
                return Scenario.findDeep(this.etape.scenarioId);
            },
            isPremiereEtape() {
                return this.etape.id.localeCompare(this.scenario.premiereEtape) === 0;
            },
        },
        data() {
            return {
                showContent: true,
                showCreateReponseForm: false,
                showEffetForm: false,
                editEtape: false
            }
        },
        methods: {
            toggleVisibilite(showContent){
                this.showContent = showContent;
            },
            edit() {
                this.$refs.etapeTitre.edit();
                this.$refs.etapeTexte.edit();
            },
            update() {
                Etape.api().put(`/${this.etape.id}`, this.etape);
            },
            deleteEtape(etape) {
                if (!confirm('Es-tu sûr de supprimer l\'étape ' + etape.titre + " ?")) return;
                Etape.remove(this.etape.id);
            },
            setPremiereEtape() {
                Scenario.edit(this.scenario.id, {premiereEtape: this.etape.id});
            }

        }
    });
</script>

<style scoped>

</style>
