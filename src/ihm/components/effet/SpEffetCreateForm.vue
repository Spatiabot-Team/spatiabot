<template>
    <v-form id="effet-form" class="pl-4" ref="effetFormRef" lazy-validation @submit.prevent="submitEffet">

        <!--quantite-->
        <v-layout row wrap>
            <v-flex xs3 class="px-0 pa-1">
                <v-text-field
                    label="Quantité"
                    v-model.number="effet.quantite"
                    type="number"
                />
            </v-flex>
            <v-flex xs9 class="px-0 pa-1">
                <v-select
                    :items="unites"
                    name="unite"
                    item-value="id"
                    item-text="libelle"
                    label="Unite..."
                    v-model="effet.unite"
                    return-object
                />
            </v-flex>
            <v-flex xs8>
                <v-textarea outline name="texte" label="Texte" rows="1" v-model="effet.texte"/>
            </v-flex>
            <v-flex xs4>
                <v-btn type="submit">Valider</v-btn>
            </v-flex>
        </v-layout>

    </v-form>
</template>
<script lang="ts">
    import Vue from "vue";
    import Unite from "../../models/Unite";
    import Effet from "../../models/Effet";
    import Etape from "../../models/Etape";
    import SpTextEditable from "../tools/SpTextEditable";

    export default Vue.extend({
        components: {SpTextEditable},
        props: {
            idEtape: {
                required: true
            }
        },
        mounted(): void {
            Unite.api().get('');
        },
        computed: {
            unites() {
                return Unite.all();
            },
        },
        data() {
            return {
                effet: new Effet(),
                valid: false
            }
        },
        methods: {
            submitEffet() {
                Etape.postEffets(this.idEtape,[this.effet]);
                this.effet = new Effet();
                this.$emit('created');
            }
        }
    });
</script>
