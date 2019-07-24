<template>
    <div class="consequence-possible-list">
        <sp-consequence-possible v-for="consequencePossible of consequencePossibles"
                                 :key="consequencePossible.id" :consequence-possible="consequencePossible"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpConsequencePossible from './SpConsequencePossible.vue';

    export default Vue.extend({
        props: {
            reponseId: {required: true}
        },
        components: {SpConsequencePossible},
        data() {
            return {
                valid: false,
            }
        },
        computed: {
            consequencePossibles() {
                return this.$store.getters.getConsequencePossibles(this.reponseId)
            }
        }
    });
</script>
