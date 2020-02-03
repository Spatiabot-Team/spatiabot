<template>
    <v-form id="scenario-create-form" ref="form" v-model="valid"
            @submit.prevent="createEtape">
        <v-container fluid grid-list-md text-xs-center>
            <v-layout row wrap>

                <v-flex xs12>
                    <v-text-field v-model="etape.titre" label="Titre" required/>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox v-model="etape.finScenario" label="Cette étape est la fin du scénario"/>
                </v-flex>

                <v-flex xs12>
                    <v-textarea outline v-model="etape.texte" name="text" label="Texte" rows="20"/>
                </v-flex>

                <v-flex xs12>Réponses</v-flex>

                <v-flex xs12 v-for="reponse in etape.reponses" :key="reponse.key">
                    <v-container fluid grid-list-md text-xs-center>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-text-field v-model="reponse.libelle" :prefix="discordPrefix"
                                              label="Libelle que doit saisir le joueur"
                                              required/>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field v-model="reponse.titre" label="Titre" required/>
                            </v-flex>
                            <v-flex xs11>
                                <v-textarea
                                    v-model="reponse.texte"
                                    outline
                                    name="text"
                                    label="Texte"
                                    rows="3"
                                />
                            </v-flex>
                            <v-flex xs1>
                                <v-icon @click="deleteReponse(reponse.key)">clear</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

                <v-flex xs12>
                    <a @click="addReponse">Ajouter une réponse</a>
                </v-flex>

                <v-flex xs12>
                    <v-btn :disabled="!valid" color="success" type="submit">Créer cette étape</v-btn>
                </v-flex>

            </v-layout>
        </v-container>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapState} from "vuex";
    import {CONFIG_ENV} from "../../../../config/config";
    import Etape from "../../models/Etape";
    import Scenario from "../../models/Scenario";

    export default Vue.extend({
        props:{
            idScenario : String
        },
        data() {
            return {
                valid: false,
                discordPrefix: CONFIG_ENV.discordPrefix,
                etape: new Etape()
            }
        },
        methods: {
            addReponse() {
                const listLength = this.etape.reponses.length;
                const reponse = {}
                this.etape.reponses.push({
                    titre: '',
                    text: '',
                    key: listLength === 0 ? 0 : this.etape.reponses[listLength - 1].key + 1
                });
            },
            deleteReponse(key: any) {
                this.etape.reponses = this.etape.reponses.filter((reponse: any) => reponse.key !== key)
            },
            async createEtape() {
                if (this.$refs.form.validate()) {
                    const {id, $id, ...e} = this.etape; // retirer id et $id
                    await Scenario.api().post(`/${this.idScenario}/etapes`,{id : this.idScenario,etapes : [{
                        titre : this.etape.titre,
                        texte : this.etape.texte
                    }]});
                    this.etape = new Etape();
                }
            }
        }
    });
</script>
