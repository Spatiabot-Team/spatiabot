<template>
    <v-form id="unite-form" ref="uniteFormRef" lazy-validation @submit.prevent="submitUnite">
        <v-layout row wrap>
            <v-flex xs2 class="px-0 pa-1">
                <v-text-field v-model="unite.code" label="code" required/>
            </v-flex>
            <v-flex xs10 class="px-0 pa-1">
                <v-text-field v-model="unite.libelle" label="libelle" required/>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                        outline
                        name="description"
                        label="Description"
                        rows="1"
                        v-model="unite.description"
                />
            </v-flex>
            <v-flex xs12>
                <v-btn color="success" type="submit">Valider</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions} from "vuex";

    export default Vue.extend({
        data() {
            return {
                unite: {},
                valid: false
            }
        },
        methods: {
            ...mapActions({
                createUnite: "createUnite"
            }),
            submitUnite() {
                this.createUnite(this.unite);
                this.unite = {};
            }
        },
        computed: {}
    });
</script>
