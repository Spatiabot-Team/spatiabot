<template>
    <span class="text-editable">

        <span v-if="!isEditing" @dblclick="edit(true)">{{value}}</span>

        <v-text-field
            v-if="isEditing"
            ref="textField"
            dense
            :value="value"
            v-bind="$attrs"
            @input="$emit('input',$event)"
            @keypress.enter="update"
        />

    </span>
</template>

<script lang="ts">
    import Vue from "vue";
    import PropsType from "../../services/props-types.service";

    export default Vue.extend({
        props: ["value","label"],
        methods: {
            /**
             * Indique au composant parent la nouvelle valeur
             */
            update(e) {
                e.preventDefault();
                this.isEditing = false;
                this.$emit('save');
            },
            /**
             * Rend le texte éditable
             * @param isEditing
             */
            edit(isEditing = true) {
                this.isEditing = isEditing;
            }
        },
        data() {
            return {
                isEditing: false
            }
        }
    });
</script>

<style scoped>

</style>
