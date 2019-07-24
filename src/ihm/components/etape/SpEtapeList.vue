<template>
    <div class="etapes">
        <Draggable
                v-model="etapes"
                :disabled="!enabled"
                class="list-group"
                ghost-class="ghost"
                @end="endDrag"
        >
            <v-flex v-if="etapes.length > 0" v-for="etape of etapes" :key="etape.id">
                <sp-etape :etape="etape"/>
            </v-flex>
        </Draggable>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Draggable from 'vuedraggable';

    import SpEtape from './SpEtape.vue';
    import {mapGetters} from "vuex";
    import {byAttribute} from "../../services/hof.service";

    export default Vue.extend({
        components: {SpEtape, Draggable},
        data() {
            return {
                enabled: true
            };
        },
        computed: {
            etapes: {
                get() {
                    return this.$store.getters.getEtapes.sort(byAttribute("order"));
                },
                set(etapes: any[]) {
                    this.$store.dispatch('saveOrderEtape', etapes);
                }
            }
        },
        methods: {
            endDrag(e) {

            }
        }
    });
</script>

<style scoped>

</style>
