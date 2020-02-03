<template>
    <span class="toggle">
        <span v-if="value" @click="turn" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
            <v-icon>check_box</v-icon> {{label.on}}
        </span>
        <span v-if="!value" @click="turn" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
            <v-icon>check_box_outline_blank</v-icon> {{label.off}}
        </span>
    </span>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            value: Boolean,
            label: {}
        },
        methods: {
            turn(){
                this.$emit('input', !this.value)
            }
        }
    });
</script>

<style scoped>

</style>
