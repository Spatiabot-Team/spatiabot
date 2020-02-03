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
                    v-model="consequencePossible.etapeSuivante"
                    return-object
                />
            </v-flex>
            <v-btn type="submit">Valider</v-btn>
        </v-layout>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import Etape from "../../models/Etape";
    import ConsequencePossible from "../../models/ConsequencePossible";
    import Reponse from "../../models/Reponse";

    export default Vue.extend({
        props: {
            idReponse: {
                required: true
            }
        },
        computed: {
            etapes() {
                return Etape.query().where('scenarioId', this.$route.params.uuid).all();
            }
        },
        data() {
            return {
                consequencePossible: new ConsequencePossible()
            }
        },
        methods: {
            submitConsequencePosible() {
                Reponse.postConsequencePossibles(this.idReponse,[this.consequencePossible]);
                this.consequencePossible = new ConsequencePossible();
                this.$emit('created')
            }
        }
    });
</script>
