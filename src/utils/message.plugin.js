import M from "materialize-css/dist/js/materialize.min.js";
export default {
  install(Vue, html) {
    Vue.prototype.$message = function (html) {
      M.toast({ html });
    };
    Vue.prototype.$error = function () {
      M.toast({ html: `Ошибка: ${html}` });
    };
  },
};
