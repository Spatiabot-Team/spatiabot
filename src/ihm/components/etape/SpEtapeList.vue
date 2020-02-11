<template>
    <div class="etapes">
        <v-flex xs12>
            <sp-toggle icon="visibility" v-model="showContent" @input="toggleVisibilite" :label="{on:'Tout masquer',off:'Tout déplier'}"/>
        </v-flex>
        <v-flex v-if="etapes.length > 0" v-for="etape of etapes" :key="'etape-'+etape.id">
            <sp-etape :etape="etape" ref="etapes"/>
        </v-flex>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpEtape from './SpEtape.vue';
    import SpToggle from "./../tools/SpToggle";

    export default Vue.extend({
        components: {SpEtape, SpToggle},
        props: ['etapes'],
        data() {
            return {
                showContent: true,
                enabled: true
            };
        },
        computed: {},
        methods: {
            toggleVisibilite() {
                for (const spEtape of this.$refs["etapes"]) {
                    spEtape.toggleVisibilite(this.showContent);
                }
            },
        }
    });
</script>

<style scoped>

</style>
