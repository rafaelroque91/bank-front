import axios from "axios";
import store from "@/store/index";

const URL = process.env.VUE_APP_API_URL;
const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

class LoginService {
 
  async register(request) {  
    return axios.post(URL+"/api/register", request);
  }
  
  login(request) {  
    request.grant_type = 'password';
    request.client_id = CLIENT_ID;
    request.client_secret = CLIENT_SECRET;
    request.scope = '*';
        
    return axios.post(URL+"/oauth/token", request);
  }

  getUserData() {  
    return axios.get(URL + "/api/user", {
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }
}

export default new LoginService();
