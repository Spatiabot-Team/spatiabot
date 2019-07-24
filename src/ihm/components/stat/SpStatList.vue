<!-- src/components/Hello.ihm -->
<template>
    <v-layout row wrap>
        <v-flex v-for="stat in stats" :key="stat.id" xs12>
            <sp-stat :stat="stat" :owner="owner" :id-owner="idOwner"/>
        </v-flex>
        <v-flex xs12>
            <v-divider/>
            <v-subheader>Ajouter une stat</v-subheader>
            <sp-stat-create-form :owner="owner" :id-owner="idOwner"/>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpStat from './SpStat.vue';
    import SpStatCreateForm from './SpStatCreateForm.vue';

    export default Vue.extend({
        props: {
            idOwner: null,
            owner: {},
            stats: {
                default:[]
            }
        },
        components: {SpStat, SpStatCreateForm}
    });
</script>

<style>
</style>
