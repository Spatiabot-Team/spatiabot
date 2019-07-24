<template>
    <v-form id="reponse-form"  class="pl-4" ref="reponseFormRef" v-model="valid" lazy-validation @submit.prevent="submitReponse">
        <v-text-field v-model="reponse.libelle" :prefix="discordPrefix + 'reponse'"
                      label="Commande que doit saisir le joueur" required/>
        <v-text-field v-model="reponse.titre" label="Titre" required/>
        <v-textarea
                outline
                v-model="reponse.texte"
                name="text"
                label="Texte"
                rows="3"
        />
        <v-btn :disabled="!valid" color="success" type="submit">Valider</v-btn>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions} from "vuex";
    import {CONFIG_ENV} from "../../../../config/config";

    export default Vue.extend({
        props: {
            etapeId: {
                required: false
            }
        },
        data() {
            return {
                discordPrefix : CONFIG_ENV.discordPrefix,
                reponse: {},
                valid: false
            }
        },
        methods: {
            ...mapActions({
                createReponse: "createReponse"
            }),
            submitReponse() {
                this.createReponse({idEtape: this.etapeId, reponse: {...this.reponse}});
                this.reponse = {};
            }
        },
        computed: {}
    });
</script>
