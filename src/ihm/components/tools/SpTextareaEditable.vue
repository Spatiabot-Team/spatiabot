<template>
    <span class="textarea-editable">
                <pre v-if="!isEditing" class="discordFormat" @dblclick="edit">{{value}}</pre>
                <v-textarea
                    v-if="isEditing"
                    ref="textField"
                    :value="value"
                    v-bind="$attrs"
                    v-on="$listeners"
                    @input="$emit('input',$event)"
                    @blur="updateBlur"
                    @keypress.enter="update"
                    outline
                    auto-grow="true"
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
