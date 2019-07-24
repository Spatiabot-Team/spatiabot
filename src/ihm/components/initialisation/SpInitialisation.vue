<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Initialisation</h1>
            </v-flex>
            <v-flex xs6>
                <sp-init-monde v-if="initialisation" :monde="initialisation.monde"/>
            </v-flex>
            <hr/>
            <v-flex xs5>
                <sp-init-joueur v-if="initialisation" :joueur="initialisation.joueur"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";
    import SpInitMonde from "./SpInitMonde.vue";
    import SpInitJoueur from "./SpInitJoueur.vue";

    export default Vue.extend({
        components: {SpInitMonde, SpInitJoueur},
        async mounted() {
            this.$store.dispatch('loadInitialisation');
        },
        computed: {
            ...mapGetters({
                initialisation: "getInitialisation"
            })
        },
        data() {
            return {}
        },
        methods: {}
    });
</script>

