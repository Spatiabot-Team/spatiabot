<template>
    <div class="etape">
        <v-card>
            <v-toolbar v-if="!editEtape">
                <v-toolbar-title @dblclick="editEtape = true">
                    {{etape.titre}}
                    <v-icon small @click="editEtape = true">edit</v-icon>
                    <v-icon small @click="deleteEtape(etape)">delete_forever</v-icon>
                    <v-chip v-if="etape.finScenario">
                        Fin du scénario
                    </v-chip>
                    <span v-if="isPremiereEtape" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
                        <v-icon>toggle_on</v-icon> Première étape
                    </span>
                    <span v-if="!isPremiereEtape" @click="setPremiereEtape" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
                        <v-icon>toggle_off</v-icon> Activer comme première étape
                    </span>
                </v-toolbar-title>
            </v-toolbar>
            <v-toolbar md-toolbar-row v-if="editEtape">
                <v-text-field
                        @keyup.enter="update" label="Name"
                        v-model="etape.titre" required
                        width="100%"/>
                <v-checkbox v-model="etape.finScenario" label="Cette étape est la fin du scénario"/>
            </v-toolbar>

            <v-flex v-if="!editEtape" @dblclick="editEtape = true" class="pa-4">
                <pre class="discordFormat">{{etape.texte}}</pre>
            </v-flex>
            <v-flex v-if="editEtape" class="pa-4">
                <v-textarea
                        outline @keyup.enter="update"
                        name="texte" label="Texte"
                        rows="10" v-model="etape.texte"
                />
                <v-btn small color="success" @click="update" type="button">Enregistrer</v-btn>
            </v-flex>

            <v-divider></v-divider>
            <v-flex>
                <v-subheader>Effets
                    <v-icon small right @click="showEffetForm=!showEffetForm">add_circle</v-icon>
                </v-subheader>
                <sp-effet-list :etape-id="etape.id"/>
                <sp-effet-create-form v-if="showEffetForm" :etape-id="etape.id"/>
            </v-flex>
            <v-divider></v-divider>

            <v-flex>
                <v-subheader>Réponses
                    <v-icon small right @click="showCreateReponseForm=!showCreateReponseForm">add_circle</v-icon>
                </v-subheader>
                <sp-reponse-list v-if="etape.reponses" :etape-id="etape.id"/>
                <sp-reponse-create-form v-if="showCreateReponseForm" :etape-id="etape.id"/>
            </v-flex>
        </v-card>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    import SpReponseList from '../reponse/SpReponseList.vue';
    import SpReponseCreateForm from '../reponse/SpReponseCreateForm.vue';
    import {mapActions, mapGetters} from "vuex";
    import SpEffetCreateForm from '../effet/SpEffetCreateForm.vue';
    import SpEffetList from "../effet/SpEffetList.vue";

    export default Vue.extend({
        props: {
            etape: {
                required: true
            }
        },
        components: {SpReponseList, SpReponseCreateForm, SpEffetCreateForm, SpEffetList},
        computed: {
            edit() {
                return this.currentEtapeId == this.etape.id
            },
            etapeTexteFormated() {
                return '<b>' + this.etape.texte + '</b>'
            },
            isPremiereEtape(){
                return this.etape.id === this.scenario.premiere_etape;
            },
            ...mapGetters({
                scenario: "getCurrentScenario"
            }),
        },
        data: () => ({
            showCreateReponseForm: false,
            showEffetForm: false,
            editEtape: false
        }),
        mounted() {
        },
        methods: {
            ...mapActions({
                updateScenario: "updateScenario",
                updateEtape: "updateEtape",
                removeEtape: "removeEtape"
            }),
            update(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                this.updateEtape(this.etape);
                this.editEtape = false;
            },
            deleteEtape(etape) {
                if (!confirm('Es-tu sûr de supprimer l\'étape ' + etape.titre + " ?")) return;

                this.removeEtape(etape.id);
            },
            setPremiereEtape() {
                this.updateScenario({premiere_etape: this.etape.id})
            }

        }
    });
</script>

<style scoped>

</style>
