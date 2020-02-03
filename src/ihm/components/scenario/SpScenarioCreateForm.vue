<!-- src/components/Hello.ihm -->
<template>
    <v-form ref="scenarioCreateFormRef" v-model="valid" lazy-validation
            @submit.prevent="createScenario">
        <v-text-field v-model="scenario.titre" label="Titre" required/>
        <v-btn :disabled="!valid" color="success" type="submit">Créer ce scénario</v-btn>
    </v-form>
</template>

<script lang="ts">
    import Vue from "vue";
    import Scenario from "../../models/Scenario";

    export default Vue.extend({
        data: () => ({
            valid: true,
            scenario: {
                titre: ''
            },
        }),
        methods: {
            createScenario() {
                //if (this.$refs.scenarioCreateFormRef.validate()) {
                Scenario.api().post('', {...this.scenario});
                //}
            }
        }
    });
</script>

<style>
</style>
