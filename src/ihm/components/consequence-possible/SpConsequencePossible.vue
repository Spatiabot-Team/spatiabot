<template>
    <div class="consequence-possible">
        <p v-if="!editConsequencePossible">
            <v-chip>
                <v-avatar class="grey darken-4"
                          style="width:50px"><b>{{consequencePossible.poids}}</b></v-avatar>
                {{etapeSuivanteTitre}}
                <v-icon small right @click="editConsequencePossible = true">edit</v-icon>
                <v-icon small right @click="deleteConsequencePossible">delete_forever</v-icon>
            </v-chip>
        </p>
        <p v-if="editConsequencePossible">
            <v-form id="consequence-possible-update-form" ref="consequencePossibleUpdateFormRef" lazy-validation
                    @submit.prevent="submitConsequencePosibleUpdate">
                <v-layout>
                    <v-flex xs6>
                        <v-text-field type="number" v-model="consequencePossible.poids" label="Poids de la probabilité"
                                      required/>
                    </v-flex>
                    <v-flex xs6>
                        <v-select
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
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions} from "vuex";

    export default Vue.extend({
        props: {
            consequencePossible: {
                required: true
            }
        },
        data: () => ({
            editConsequencePossible: false

        }),
        mounted() {
            if (this.consequencePossible.etapeSuivante == null) {
                this.consequencePossible.etapeSuivante = {};
            }
        },
        computed: {
            etapes() {
                return this.$store.getters.getEtapes
            },
            etapeSuivanteTitre() {
                if (!this.consequencePossible.etapeSuivanteId) return "";
                return this.$store.getters.getEtapeById(this.consequencePossible.etapeSuivanteId).titre;
            }
        },
        methods: {
            ...mapActions({
                updateConsequencePossible: "updateConsequencePossible",
                removeConsequencePossible: "removeConsequencePossible"
            }),
            submitConsequencePosibleUpdate(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                this.updateConsequencePossible(this.consequencePossible);
                this.editConsequencePossible = false;
            },
            deleteConsequencePossible() {
                if (!confirm('Es-tu sûr de supprimer la conséquence possible ?')) return;

                this.removeConsequencePossible(this.consequencePossible.id);
            },
        }

    });

</script>

<style scoped>

</style>
