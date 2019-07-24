<template>
    <span>
        <v-chip>
            <v-avatar class="grey darken-4"><b><span v-if="effet.quantite > 0">+</span>{{effet.quantite}}</b></v-avatar>
            {{uniteLibelle}}
            <v-icon small right @click="editEffet = !editEffet">edit</v-icon>
            <v-icon small right @click="deleteEffet">delete_forever</v-icon>
        </v-chip>

        <v-form v-if="editEffet" id="effet-update-form" ref="effetUpdateFormRef" lazy-validation
                @submit.prevent="submitEffetUpdate">
            <v-layout row wrap>
                <v-flex xs2 class="px-0">
                    <v-text-field type="number" v-model="effet.quantite" label="quantite" required/>
                </v-flex>
                <v-flex xs10 class="px-0">
                    <v-select v-if="unites"
                            :items="unites"
                            name="unite"
                            item-value="id"
                            item-text="libelle"
                            label="Unite..."
                            v-model="effet.unite.id"
                    />
                </v-flex>
                <v-flex xs12>
                    <v-textarea outline name="texte" label="Texte" rows="1" v-model="effet.texte"/>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="success" type="submit">Valider</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </span>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";

    export default Vue.extend({
        props: {
            effet: {
                required: true
            }
        },
        data: () => ({
            editEffet: false
        }),
        computed: {
            ...mapGetters({
                unites: "getUnites"
            }),
            uniteLibelle(){
                const unite = this.$store.getters.getUniteById(this.effet.unite.id);
                return (!unite || !this.effet.unite.id) ? "" : unite.libelle;
            }
        },
        methods: {
            ...mapActions({
                updateEffet: "updateEffet",
                removeEffet: "removeEffet"
            }),
            getUnite(uniteId) {
                return this.$store.getters.getUniteById(uniteId);
            },
            submitEffetUpdate(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                this.updateEffet(this.effet);
                this.editEffet = false;
            },
            deleteEffet() {
                if (!confirm('Es-tu sûr de supprimer l\'effet ?')) return;

                this.removeEffet(this.effet.id);
            },
        }

    });

</script>

<style scoped>
    .v-chip .v-avatar {
        width: 100% !important;
    }
</style>
