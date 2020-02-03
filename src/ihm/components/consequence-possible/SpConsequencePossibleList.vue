<template>
    <div class="consequence-possible-list">
        <sp-consequence-possible v-for="consequencePossible of consequencePossibles"
                                 :key="'consequence-possible-'+consequencePossible.id"
                                 :consequence-possible="consequencePossible"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpConsequencePossible from './SpConsequencePossible.vue';

    export default Vue.extend({
        props: ["consequencePossibles"],
        components: {SpConsequencePossible},
    });
</script>
