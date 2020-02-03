<template>
    <v-form id="reponse-form" class="pl-4" ref="reponseFormRef" v-model="valid" lazy-validation
            @submit.prevent="submitReponse">
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
        <v-btn :disabled="!valid" type="submit">Valider</v-btn>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import {CONFIG_ENV} from "../../../../config/config";
    import Reponse from "../../models/Reponse";
    import Etape from "../../models/Etape";

    export default Vue.extend({
        props: {
            idEtape: {
                required: false
            }
        },
        data() {
            return {
                discordPrefix: CONFIG_ENV.discordPrefix,
                reponse: new Reponse(),
                valid: false
            }
        },
        methods: {
            submitReponse() {
                Etape.postReponses(this.idEtape, [this.reponse]);
                this.reponse =  new Reponse();
            }
        }
    });
</script>
