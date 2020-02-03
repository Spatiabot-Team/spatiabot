<template>
    <div class="text-xs-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                    Gérer les unités
                </v-btn>
            </template>

            <v-card>
                <v-toolbar>
                    <v-toolbar-title>
                        Gérer les unites
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="dialog = false">
                        Fermer
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <p>Liste des unités</p>

                    <v-list dense>
                        <v-list-tile v-if="unites" v-for="unite in unites" :key="unite.id">
                            <v-list-tile-action>
                                <v-icon>class</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ unite.libelle}}
                                    <v-icon @click="removeUnite(unite)">delete_forever</v-icon>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                    <v-divider/>

                    <v-subheader>Ajouter une unité</v-subheader>
                    <sp-unite-create-form/>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";
    import SpUniteCreateForm from './SpUniteCreateForm.vue';
    import Unite from "../../models/Unite";

    export default Vue.extend({
        components: {SpUniteCreateForm},
        computed: {
            unites(){
                return Unite.all();
            },
        },
        data() {
            return {
                dialog: false,
                unite: {}
            }
        },
        methods: {
            ...mapActions({
                updateUnite: "updateUnite",
                removeUnite: "removeUnite"
            }),
            updateUnite(e) {
                e.preventDefault();

                // Update when Enter key is pressed but not if shift+enter is pressed
                if (e.shiftKey) return;

                this.updateUnite(this.unite);
            },
            deleteUnite(unite) {
                if (!confirm('Es-tu sûr de supprimer l\'unité ' + unite.libelle + " ?")) return;

                this.removeUnite(unite.id);
            },
        }
    });
</script>

