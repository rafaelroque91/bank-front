import axios from "axios";
import store from "@/store/index";

const URL = process.env.VUE_APP_API_URL + '/api';

class TransactionService {
  
  getUserTransactions(dateFilter) {
    return axios.get(URL + "/transactions", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
      params: {"filter-month":dateFilter}
    });
  }

  getUserChecks(dateFilter) {
    return axios.get(URL + "/check/list", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
      params: {"filter-month":dateFilter}
    });
  }

  getUserExpenses(dateFilter) {
    return axios.get(URL + "/expense/list", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
      params: {"filter-month":dateFilter}
    });
  }

  getUserIncomes(dateFilter) {
    return axios.get(URL + "/income/list", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
      params: {"filter-month":dateFilter}
    });
  }

  getUserCurrentBalance() {
    return axios.get(URL + "/user/balance", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }

  getUserMonths() {
    return axios.get(URL + "/user/months", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }

  purchase(data) {
    return axios.post(URL + "/expense/purchase",data, {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }

  depositCheck(data) {
    return axios.post(URL + "/check/deposit",data, {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }  

  getChecksToApprove() {   
    return axios.get(URL + "/admin/check/pending", {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      }
    });
  }

  aproveCheck(id) {
    return axios.post(URL + "/admin/check/approve/"+id,null, {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  }

  rejectCheck(id) {  
    return axios.post(URL + "/admin/check/reject/"+id,null, {    
      headers: {
        Authorization: `Bearer ${store.state.login.access_token}`,
      },
    });
  } 
}

export default new TransactionService();
