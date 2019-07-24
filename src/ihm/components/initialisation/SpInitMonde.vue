<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <h2>Monde</h2>
            </v-flex>
            <v-flex xs12>
                <sp-stat-list :stats="monde.stats" owner="INIT_MONDE"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpStatList from './../stat/SpStatList.vue';

    export default Vue.extend({
        props: {
            monde: {}
        },
        components: {SpStatList}
    });
</script>

<style scoped>
    .v-chip .v-avatar {
        width: 100% !important;
    }
</style>
