import TransactionService from "@/services/transaction.service.js";

const TransactionStore = {
  
  state: {
    currentBalance: 0,
    totalIncomes: 0,
    totalExpenses: 0,  
    transactions: [],    
    expenses: [],
    checks: [],
    months: [],    
    success: false,
    message: null,
    response : null
  },
  mutations: {     
    setMonths(state, months) {
      state.months = months;
    },   
    setCurrentBalance(state, currentBalance) {
      state.currentBalance = currentBalance;
    },
    setTotalIncomes(state, totalIncomes) {
      state.totalIncomes = totalIncomes;
    },
    setTotalExpenses(state, totalExpenses) {
      state.totalExpenses = totalExpenses;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    setChecks(state, checks) {
      state.checks = checks;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    setResponse(state,response){
      state.response = response;
    }
  },
  actions: {
    getTransactions({ commit }, dateFilter) {
      TransactionService.getUserTransactions(dateFilter)
      .then((r) => {                        
        commit("setTotalIncomes", r.data.data.totalIncome);                 
        commit("setTotalExpenses", r.data.data.totalExpense);                 
        commit("setTransactions", r.data.data.transactions);                         
        commit("setCurrentBalance", r.data.data.currentBalance);                 
      }).catch((r) => {        
        commit("setResponse", r);
      });
    }, 

    getChecks({ commit }, dateFilter) {            
      TransactionService.getUserChecks(dateFilter)
      .then((r) => {               
        commit("setChecks", r.data.data);                         
      }).catch((r) => {        
        commit("setResponse", r);
      });
    }, 

    getCurrentBalance({ commit }) {
      TransactionService.getUserCurrentBalance()
      .then((r) => {                
        commit("setCurrentBalance", r.data.data);                 
      }).catch((r) => {        
        commit("setResponse", r);
      });
    },  

    getMonths({ commit }) {
      TransactionService.getUserMonths()
      .then((r) => {                 
        commit("setMonths", r.data.data);                         
      }).catch((r) => {                
        commit("setResponse", r);
      });
    }, 

    purchase({ commit },data) {
      TransactionService.purchase(data)
      .then((r) => {                                 
        commit("setResponse", r);             
      }).catch((r) => {              
        commit("setResponse", r);
      });
    }, 

    getChecksToApprove({ commit }) {
      TransactionService.getChecksToApprove()
      .then((r) => {  
        commit("setChecks", r.data.data);         
      }).catch((r) => {  
        commit("setResponse", r);
      });
    }, 
                   
  }
};

export default TransactionStore;
