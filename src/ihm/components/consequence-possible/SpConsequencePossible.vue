<template>
    <div class="consequence-possible">
        <p v-if="!editConsequencePossible">
            <v-chip>
                <v-avatar class="grey darken-4"
                          style="width:50px"><b><sp-text-editable
                    v-model="consequencePossible.poids"
                    ref="consequencePossiblePoids"
                    label="Poids"
                    @save="update"
                /></b></v-avatar>
                <sp-select-editable
                    ref="consequencePossibleEtapeSuivante"
                    v-model="consequencePossible.etapeSuivante"
                    :items="etapes"
                    name="Etape suivante"
                    item-value="id"
                    item-text="titre"
                    label="Etape suivante..."
                    @save="update"
                    return-object
                />
                <v-icon small right @click="edit">edit</v-icon>
                <v-icon small right @click="deleteConsequencePossible">delete_forever</v-icon>
            </v-chip>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Etape from "../../models/Etape";
    import ConsequencePossible from "../../models/ConsequencePossible";
    import SpSelectEditable from "../tools/SpSelectEditable";
    import SpTextEditable from "../tools/SpTextEditable";

    export default Vue.extend({
        props: {
            consequencePossible: {
                required: true
            }
        },
        components:{
            SpTextEditable,
            SpSelectEditable
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
                return Etape.query().where('scenarioId', this.$route.params.uuid).all();
            },
            etapeSuivante() {
                if (!this.consequencePossible.etapeSuivanteId) return null;
                return Etape.find(this.consequencePossible.etapeSuivanteId);
            }
        },
        methods: {
            edit() {
                this.$refs.consequencePossiblePoids.edit();
                this.$refs.consequencePossibleEtapeSuivante.edit();
            },
            update(e) {
                ConsequencePossible.api().put(`${this.consequencePossible.id}`, this.consequencePossible);
            },
            deleteConsequencePossible() {
                if (!confirm('Es-tu sûr de supprimer la conséquence possible ?')) return;
                ConsequencePossible.remove(this.consequencePossible.id);
            },
        }

    });

</script>

<style scoped>

</style>
