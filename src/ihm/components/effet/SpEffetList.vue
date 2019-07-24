<template>
    <div class="effet-list">
        <sp-effet v-for="effet of effets"  :key="effet.id" :effet="effet"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpEffet from './SpEffet.vue';

    export default Vue.extend({
        props: {
            etapeId: {required: true}
        },
        components: {SpEffet},
        data() {
            return {
                valid: false,
            }
        },
        computed: {
            effets() {
                return this.$store.getters.getEffets(this.etapeId)
            }
        }
    });
</script>
