<!-- src/components/Hello.ihm -->
<template>
    <v-list dense>
        <v-list-tile v-if="scenarios" v-for="scenario in scenarios" :key="scenario.id"
                     @click="selectScenario(scenario.id)">
            <v-list-tile-action>
                <v-icon>class</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>
                    {{ scenario.titre }}
                    <v-icon @click="removeScenario(scenario)">delete_forever</v-icon>
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import Vue from "vue";
    import Scenario from "../../models/Scenario";

    export default Vue.extend({
        mounted(): void {},
        computed: {
            scenarios(){
                return Scenario.all();
            }
        },
        methods: {
            removeScenario(scenario) {
                if (!confirm('T\'es sûr de vouloir supprimer le scenario ' + scenario.titre + " ?")) return;
                Scenario.remove(scenario.id);
            },
            selectScenario(uuid) {
                this.$router.push({name: 'scenario', params: {uuid}});
            }
        }

    });
</script>

<style>
</style>
