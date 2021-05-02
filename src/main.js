import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin.js";
import firebase from "firebase";

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
firebase.initializeApp({
  apiKey: "AIzaSyDJC5EvqvOfi-p8OXs1onQ-X-gQCdnYTnw",
  authDomain: "vue-crm-9c869.firebaseapp.com",
  projectId: "vue-crm-9c869",
  storageBucket: "vue-crm-9c869.appspot.com",
  messagingSenderId: "1035148296964",
  appId: "1:1035148296964:web:b421321ad1519d947fc651",
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
