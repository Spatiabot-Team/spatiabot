<template>
    <v-form id="stat-form" class="pl-4" ref="statFormRef" lazy-validation @submit.prevent="submitStat">
        <v-layout row wrap>
            <v-flex xs3 class="px-1 pa-1">
                <v-text-field type="number" v-model="stat.quantite" label="quantite" required/>
            </v-flex>
            <v-flex xs4 class="px-1 pa-1">
                <v-select
                        :items="unites"
                        name="unite"
                        item-value="id"
                        item-text="libelle"
                        label="Unite..."
                        v-model="stat.unite.id"
                />
            </v-flex>
            <!--            <v-flex xs12>-->
            <!--                <v-textarea outline name="texte" label="Texte" rows="1" v-model="stat.texte" />-->
            <!--            </v-flex>-->
            <v-flex xs2>
                <v-btn small color="success" type="submit">Valider</v-btn>
            </v-flex>
        </v-layout>

    </v-form>
</template>
<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";
    import Unite from "../../models/Unite";

    const statTemplate = {
        unite: {
            id: null
        }
    };

    export default Vue.extend({
        props: {
            idOwner: {required: true},
            owner: {required: true}
        },
        computed: {
            unites(){
                return Unite.all();
            },
        },
        data() {
            return {
                stat: {...statTemplate},
                valid: false
            }
        },
        methods: {
            ...mapActions({
                createStat: "createStat",
                createStatInitJoueur: "createStatInitJoueur",
                createStatInitMonde: "createStatInitMonde",
                createStatJoueur: "createStatJoueur",
                createStatMonde: "createStatMonde"
            }),
            submitStat() {
                const submitFunctions = {
                    INIT_JOUEUR: this.createStatInitJoueur,
                    INIT_MONDE: this.createStatInitMonde,
                    JOUEUR: this.createStatJoueur,
                    MONDE: this.createStatMonde,
                };

                submitFunctions[this.owner](({id: this.idOwner, stat: {...this.stat}}))
                this.stat = {...statTemplate};
            }
        }
    });
</script>
