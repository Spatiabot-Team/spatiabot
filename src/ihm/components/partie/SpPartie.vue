<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Partie en cours</h1>
            </v-flex>
            <v-flex xs6>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2>Monde</h2>
                        </v-flex>
                        <v-flex xs12>
                            <sp-stat-list v-if="partie && partie.monde" :stats="partie.monde.stats" owner="MONDE" :id-owner="partie.monde.id"/>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <hr/>
            <v-flex xs5>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h2>Joueurs</h2>
                        </v-flex>
                        <v-flex xs12 v-if="partie && partie.joueurs.length > 0" v-for="joueur of partie.joueurs" :key="joueur.id" >
                            <v-subheader>{{joueur.user.name}}</v-subheader>
                            <sp-stat-list :stats="joueur.stats" owner="JOUEUR" :id-owner="joueur.id"/>
                            <hr />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";
    import SpStatList from "./../stat/SpStatList"

    export default Vue.extend({
        components: {SpStatList},
        async mounted() {
            this.$store.dispatch('loadPartie');
        },
        computed: {
            ...mapGetters({
                partie: "getPartie"
            })
        },
        data() {
            return {}
        },
        methods: {}
    });
</script>

