<template>
    <span class="toggle">
        <span @click="turn" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
            <v-icon small>{{ value ? iconSelected.on : iconSelected.off}}</v-icon> {{value ? label.on : label.off}}
        </span>
    </span>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            value: Boolean,
            label: {
                default: () => ({on: '', off: ''})
            },
            icon: {
                default: "toggle"
            },
            small:{
                default:false
            }
        },
        methods: {
            turn() {
                this.$emit('input', !this.value)
            }
        },
        computed: {
            iconSelected() {
                return this.icons[this.icon];
            }
        },
        data() {
            return {
                icons: {
                    toggle: {on: "toggle_on", off: "toggle_off"},
                    checkbox: {on: "check_box", off: "check_box_outline_blank"},
                    radio: {on: "radio_button_checked", off: "radio_button_unchecked"},
                    visibility: {on: "visibility", off: "visibility_off"},
                }
            }
        }
    });
</script>

<style scoped>

</style>
