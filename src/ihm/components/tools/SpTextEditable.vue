<template>
    <span class="text-editable">
        <span v-if="!isEditing" @dblclick="edit(true)">{{value}}</span>
        <v-btn v-if="!isEditing && value===''" @click="edit(true)">Editer</v-btn>
        <v-text-field
            v-if="isEditing"
            ref="textField"
            :value="value"
            v-bind="$attrs"
            v-on="$listeners"
            dense
            @input="$emit('input',$event)"
            @keypress.enter="update"
        />
    </span>
</template>

<script lang="ts">
    import Vue from "vue";
    import PropsType from "../../services/props-types.service";

    export default Vue.extend({
        props: ["value", "label"],
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
                this.$nextTick(() => {
                    this.$refs.textField.focus();
                });
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
