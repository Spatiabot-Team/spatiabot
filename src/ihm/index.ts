import Vue from "vue";
import Vuetify from 'vuetify';
// const VueForm = require('vue-form');
import 'vuetify/dist/vuetify.min.css';
// @ts-ignore
import AppComponent from './components/AppComponent.vue';

Vue.use(Vuetify);
// Vue.use(VueForm);
new Vue({
    el: "#app",
    template: `
    <div>
       <app-component></app-component>
    </div>
    `,
    data: {name: "World"},
    components: {
        AppComponent
    }
});
