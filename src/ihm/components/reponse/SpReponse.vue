<template>
    <div class="reponse pl-4">
        <v-divider/>
        <v-layout row wrap v-if="!editReponse">
            <v-flex xs6>
                <h3 @dblclick="editReponse=true">
                    <kbd>{{ discordPrefix + 'reponse ' + reponse.libelle }}</kbd> {{ reponse.titre }}
                    <v-icon @click="editReponse = true">edit</v-icon>
                    <v-icon @click="deleteReponse">delete_forever</v-icon>
                </h3>
                <p @dblclick="editReponse=true">{{ reponse.texte }}</p>
            </v-flex>
            <v-flex xs6>
                <v-subheader>Conséquences possibles
                    <v-icon small right @click="showConsequencePossibleForm=!showConsequencePossibleForm">add_circle</v-icon>
                </v-subheader>
                <sp-consequence-possible-list :reponse-id="reponse.id"/>
                <sp-consequence-possible-create-form v-if="showConsequencePossibleForm" :reponse-id="reponse.id"/>
            </v-flex>
        </v-layout>

        <v-layout v-if="editReponse">
            <p>
                <v-text-field @keyup.enter="update" v-model="reponse.titre" label="Name" required width="100%"/>
            </p>
            <p>
                <v-textarea
                        outline
                        @keyup.enter="update"
                        name="texte"
                        label="Texte"
                        rows="3"
                        v-model="reponse.texte"
                />
            </p>
            <p>
                <v-btn color="success" @click="update" type="button">Ok</v-btn>
                <v-btn color="success" @click="editReponse=false" type="button">Annuler</v-btn>
            </p>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions} from "vuex";
    import SpConsequencePossibleCreateForm
        from '../consequence-possible/SpConsequencePossibleCreateForm.vue';
    import SpConsequencePossibleList from '../consequence-possible/SpConsequencePossibleList.vue';
    import {CONFIG_ENV} from "../../../../config/config";

    export default Vue.extend({
        props: {
            reponse: {
                required: true
            }
        },
        components: {
            SpConsequencePossibleCreateForm,
            SpConsequencePossibleList
        },
        data: () => ({
            discordPrefix : CONFIG_ENV.discordPrefix,
            editReponse: false,
            showConsequencePossibleForm : false
        }),
        mounted() {
        },
        methods: {
            ...mapActions({
                updateReponse: "updateReponse",
                removeReponse: "removeReponse"
            }),
            update(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                this.updateReponse(this.reponse);
                this.editReponse = false;
            },
            deleteReponse() {
                if (!confirm('Es-tu sûr de supprimer la réponse ' + this.reponse.titre + ' ?')) return;

                this.removeReponse(this.reponse.id);
            },
        }

    });
</script>

<style scoped>

</style>
