import Vue from "vue";
import App from "./App.vue";
import Vuetify from "./plugins/vuetify";
import titleMixin from "./mixins/titleMixin.js";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

Vue.component("VueSlider", VueSlider);

Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
    Vuetify,
    render: (h) => h(App),
}).$mount("#app");
