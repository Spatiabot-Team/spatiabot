<template>
    <span class="textarea-editable">
        <pre v-if="!isEditing"  @dblclick="edit">{{value}}</pre>
        <v-btn v-if="!isEditing && value===''" @click="edit(true)">Editer</v-btn>
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
            updateBlur() {
                this.isEditing = false;
                this.$emit('save');
            },
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
    pre {
        white-space: pre-wrap;       /* Since CSS 2.1 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }
</style>
