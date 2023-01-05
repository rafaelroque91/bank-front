import LoginService from "@/services/login.service";

const LoginModule = {
  state: {
    access_token: null,
    message: null,
    isAdmin : 0,
    response : null,
  },
  mutations: {
    setAccessToken(state, access_token) {
      state.access_token = access_token;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    setResponse(state, response) {
      state.response = response;
    },
  },
  actions: {
    async login({ commit }, data) {     
      await LoginService.login(data)
      .then((r) => {          
          commit("setAccessToken", r.data.access_token);               
          localStorage.setItem('token', r.data.access_token);
        })           
        .catch((r) => {
          commit("setResponse", r);                            
        });
    },
    logoff({ commit }) {
      commit("setAccessToken", "");
      localStorage.removeItem('token');
    },

    async getUserData({ commit }) {      
      await LoginService.getUserData()
        .then((r) => {          
          commit("setIsAdmin", r.data.admin);
        })           
        .catch((r) => {     
          commit("setResponse", r);  
        });
    }, 
       
    setAccessToken({ commit }, access_token) {
      commit("setAccessToken", access_token);
    },
  },
};

export default LoginModule;
