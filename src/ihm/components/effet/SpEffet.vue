<template>
    <span>
        <v-chip>
            <v-avatar class="grey darken-4">
                <b><span v-if="effet.quantite > 0">+</span>
                    <sp-text-editable v-model="effet.quantite" ref="effetQuantite" label="" solo filled rounded @save="update"/>
            </b></v-avatar>
            <sp-select-editable
                ref="effetUnite"
                v-model="effet.unite"
                :items="unites"
                name="unite"
                item-value="id"
                item-text="libelle"
                label="Unite..."
                @save="update"
                return-object
            />
            <v-icon small right @click="editEffet">edit</v-icon>
            <v-icon small right @click="deleteEffet">delete_forever</v-icon>
        </v-chip>

    </span>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpTextEditable from "../tools/SpTextEditable";
    import SpSelectEditable from "../tools/SpSelectEditable";
    import Unite from "../../models/Unite";
    import Effet from "../../models/Effet";

    export default Vue.extend({
        components : {
            SpTextEditable,
            SpSelectEditable
        },
        props: {
            effet: {
                required: true
            }
        },
        mounted(){
            Unite.api().get('');
        },
        data(){
            return {}
        },
        computed: {
            unites(){
              return Unite.all();
            }
        },
        methods: {
            update() {
                Effet.edit(this.effet.id,this.effet);
                this.$refs.effetQuantite.edit(false);
                this.$refs.effetUnite.edit(false);
            },
            editEffet(){
                this.$refs.effetQuantite.edit();
                this.$refs.effetUnite.edit();
            },
            deleteEffet() {
                if (!confirm('Es-tu sûr de supprimer l\'effet ?')) return;

                Effet.remove(this.effet.id);
            },
        }

    });

</script>

<style scoped>
    .v-chip .v-avatar {
        width: 100% !important;
    }
</style>
