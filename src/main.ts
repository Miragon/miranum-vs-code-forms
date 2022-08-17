import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import builderPlugin from "@muenchen/digiwf-form-builder";

Vue.config.productionTip = false;

Vue.use(builderPlugin);

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app');
