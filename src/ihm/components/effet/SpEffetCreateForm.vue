<template>
    <v-form id="effet-form" class="pl-4" ref="effetFormRef" lazy-validation @submit.prevent="submitEffet">
        <!--quantite-->
        <v-layout row wrap>
            <v-flex xs1 class="px-0 pa-1">
                <v-text-field type="number" v-model="effet.quantite" label="quantite" required/>
            </v-flex>
            <v-flex xs1 class="px-0 pa-1">
                <v-select
                        :items="unites"
                        name="unite"
                        item-value="id"
                        item-text="code"
                        label="Unite..."
                        v-model="effet.unite.id"
                />
            </v-flex>
<!--            <v-flex xs12>-->
<!--                <v-textarea outline name="texte" label="Texte" rows="1" v-model="effet.texte" />-->
<!--            </v-flex>-->
            <v-flex xs2>
                <v-btn color="success" type="submit">Valider</v-btn>
            </v-flex>
        </v-layout>

    </v-form>
</template>
<script lang="ts">
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";

    const effetTemplate = {
        unite : {
            id : null
        }
    };

    export default Vue.extend({
        props: {
            etapeId: {
                required: true
            }
        },
        computed: {
            ...mapGetters({
                unites: "getUnites"
            })
        },
        data() {
            return {
                effet: {...effetTemplate},
                valid: false
            }
        },
        methods: {
            ...mapActions({
                createEffet : "createEffet"
            }),
            submitEffet() {
                console.log(this.etapeId)
                this.createEffet({idEtape : this.etapeId,effet : {...this.effet}});
                this.effet = {...effetTemplate};
            }
        }
    });
</script>
