<!-- src/components/Hello.ihm -->
<template>
    <v-layout row wrap>

        <v-flex v-if="!editStat" xs12>
            {{stat.quantite}} {{getUniteAttr(stat.unite.id,"libelle")}}
            <v-icon small @click="editStat=true">edit</v-icon>
            <v-icon small @click="deleteStat()">delete_forever</v-icon>
        </v-flex>

        <v-flex v-if="editStat" xs12>
            <v-form class="pl-4" lazy-validation @submit.prevent="submitStat">
                <v-layout row wrap>
                    <v-flex xs2 class="px-0 pa-1">
                        <v-text-field type="number" v-model="stat.quantite" label="quantite" required/>
                    </v-flex>
                    <v-flex xs3 class="px-0 pa-1">
                        <v-select
                                :items="unites"
                                name="unite"
                                item-value="id"
                                item-text="code"
                                label="Unite..."
                                v-model="stat.unite.id"
                        />
                    </v-flex>
                    <v-flex xs2>
                        <v-btn small color="success" type="submit">Valider</v-btn>
                    </v-flex>
                </v-layout>

            </v-form>
        </v-flex>

    </v-layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";

    export default Vue.extend({
        async mounted() {
            await this.$store.dispatch('loadUnites');
        },
        props: {
            stat: {},
            owner: null
        },
        computed: {
            ...mapGetters({
                unites: "getUnites"
            })
        },
        methods: {
            ...mapActions({
                updateStat: "updateStat",
                removeStat: "removeStat"
            }),
            getUniteAttr(uniteId, attr) {
                const unite = this.$store.getters.getUniteById(uniteId)
                return unite ? unite[attr] : "";
            },
            deleteStat() {
                this.removeStat({id: this.stat.id, mutation: "REMOVE_STATS_" + this.owner, ownerId: this.ownerId})
            },
            submitStat() {
                this.updateStat(this.stat);
                this.editStat = false;
            }
        },
        data() {
            return {
                editStat: false
            }
        }

    });
</script>

<style>
</style>
