<template>
    <span class="textarea-editable">

                <pre v-if="!isEditing" class="discordFormat" @dblclick="isEditing = true">{{value}}</pre>

                <v-textarea
                    v-if="isEditing"
                    v-bind="$attrs"
                    @input="$emit('input',$event)"
                    outline @keypress.enter="update"
                    @blur="updateBlur"
                    :value="value"
                />

    </span>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            value: String,
            label: {}
        },
        methods: {
            update(e) {
                if (!e.ctrlKey) return;
                e.preventDefault();
                this.isEditing = false;
                this.$emit('save');
            },
            updateBlur(){
                this.isEditing = false;
                this.$emit('save');
            },
            edit(isEditing = true){
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
