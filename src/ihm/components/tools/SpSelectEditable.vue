<template>
    <span class="select-editable">

        <span v-if="!isEditing" @dblclick="isEditing = true">{{libelle}}</span>

        <v-select v-if="isEditing"
                  :value="value"
                  v-bind="$attrs"
                  @input="$emit('input',$event)"
                  @change="update"
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
                this.isEditing = false;
                this.$emit('input', e);
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
        computed: {
            libelle() {
                return this.value[this.$attrs['item-text']];
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
