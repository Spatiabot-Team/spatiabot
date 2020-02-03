<template>
    <div class="etapes">
        <v-flex xs12>
            <span @click="showContent(true)"><v-icon small>visibility</v-icon> Tout déplier</span>
            <span @click="showContent(false)"><v-icon small>visibility_off</v-icon> Tout masquer</span>
        </v-flex>
        <v-flex v-if="etapes.length > 0" v-for="etape of etapes" :key="'etape-'+etape.id">
            <sp-etape :etape="etape" ref="etapes"/>
        </v-flex>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpEtape from './SpEtape.vue';

    export default Vue.extend({
        components: {SpEtape},
        props:['etapes'],
        data() {
            return {
                enabled: true
            };
        },
        computed: {
        },
        methods: {
            toggleVisibilite(showContent){
                for(const spEtape of this.$refs["etapes"]){
                    spEtape.toggleVisibilite(showContent);
                }
            },
        }
    });
</script>

<style scoped>

</style>
