<template>
    <v-form id="consequence-possible-form" ref="consequencePossibleFormRef" lazy-validation
            @submit.prevent="submitConsequencePosible">
        <v-layout>
            <v-flex xs3>
                <v-text-field type="number" v-model="consequencePossible.poids" label="poids" required/>
            </v-flex>
            <v-flex xs9>
                <v-select
                        clearable
                        :items="etapes"
                        name="etape-suivante"
                        item-value="id"
                        item-text="titre"
                        label="Etape suivante..."
                        v-model="consequencePossible.etapeSuivante.id"
                />
            </v-flex>
            <v-btn color="success" type="submit">Valider</v-btn>
        </v-layout>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions} from "vuex";

    const consequencePossibleTemplate = {
        etapeSuivante : {
            id : null
        },
        poids : null
    };

    export default Vue.extend({
        props: {
            reponseId: {
                required: true
            }
        },
        computed: {
            etapes() {
                return this.$store.getters.getEtapes
            }
        },
        data() {
            return {
                consequencePossible:{...consequencePossibleTemplate}
            }
        },
        methods: {
            ...mapActions({
                createConsequencePossible : "createConsequencePossible"
            }),
            submitConsequencePosible() {
                this.createConsequencePossible({idReponse : this.reponseId,consequencePossible : {...this.consequencePossible}});
                this.consequencePossible = {...consequencePossibleTemplate};
            }
        }
    });
</script>
