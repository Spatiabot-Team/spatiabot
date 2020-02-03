<template>
    <div class="reponse-list">
        <sp-reponse v-for="reponse of reponses" :key="'reponse-' + reponse.id" :reponse="reponse"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import SpReponse from './SpReponse.vue';

    export default Vue.extend({
        props: ["reponses"],
        components: {SpReponse},
        data() {
            return {
                valid: false,
            }
        },
        computed: {}
    });
</script>
