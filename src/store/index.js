import { createStore } from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

import LoginStore from "./login.store";
import TransactionStore from "./transaction.store";

export default createStore({  
  modules: {
    login : LoginStore,'transaction': TransactionStore
  },
  plugins: [
    vuexLocal.plugin,
  ]
})
