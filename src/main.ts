import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
	render: h => h(App)
}).$mount('#app');
