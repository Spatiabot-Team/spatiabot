<template>
    <div class="reponse pl-4">
        <v-divider/>
        <v-layout row wrap v-if="!editReponse">
            <v-flex xs6>
                <h3><kbd>{{ discordPrefix + 'reponse ' }}<sp-text-editable
                            v-model="reponse.libelle" ref="reponseLibelle" label="Libelle"
                            @save="update"
                        />
                    </kbd>
                    <sp-text-editable v-model="reponse.titre" ref="reponseTitre" label="Titre" @save="update"/>
                    <v-icon @click="edit">edit</v-icon>
                    <v-icon @click="deleteReponse">delete_forever</v-icon>
                </h3>
                <p>
                    <sp-textarea-editable ref="reponseTexte" v-model="reponse.texte" name="texte" label="Texte"
                                          @save="update"/>
                </p>
            </v-flex>
            <v-flex xs6>
                <v-subheader>Conséquences possibles
                    <v-icon small right @click="showConsequencePossibleForm=!showConsequencePossibleForm">add_circle
                    </v-icon>
                </v-subheader>
                <sp-consequence-possible-list :consequence-possibles="reponse.consequencePossibles"
                                              :id-reponse="reponse.id"/>
                <sp-consequence-possible-create-form v-if="showConsequencePossibleForm" :id-reponse="reponse.id" @created="showConsequencePossibleForm=false"/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpConsequencePossibleCreateForm
        from '../consequence-possible/SpConsequencePossibleCreateForm.vue';
    import SpConsequencePossibleList from '../consequence-possible/SpConsequencePossibleList.vue';
    import {CONFIG_ENV} from "../../../../config/config";
    import SpTextEditable from "../tools/SpTextEditable";
    import SpTextareaEditable from "../tools/SpTextareaEditable";
    import Reponse from "../../models/Reponse";

    export default Vue.extend({
        props: {
            reponse: {
                required: true
            }
        },
        components: {
            SpConsequencePossibleCreateForm,
            SpConsequencePossibleList,
            SpTextEditable,
            SpTextareaEditable
        },
        data() {
            return {
                discordPrefix: CONFIG_ENV.discordPrefix,
                editReponse: false,
                showConsequencePossibleForm: false
            }
        },
        methods: {
            edit() {
                this.$refs.reponseLibelle.edit();
                this.$refs.reponseTitre.edit();
                this.$refs.reponseTexte.edit();
            },
            update(e) {
                Reponse.api().put(`${this.reponse.id}`, this.reponse);
            },
            deleteReponse() {
                if (!confirm('Es-tu sûr de supprimer la réponse ' + this.reponse.titre + ' ?')) return;
                Reponse.remove(this.reponse.id);
            },
        }

    });
</script>

<style scoped>

</style>
