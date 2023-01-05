<template>    
  <div>
    <div class="reg regIncome">
        <div class="row">
            <div class="col">
                <div class="row">
                    <span class="fw-bold">Incomes</span>
                </div>
                <div class="row">
                    <span class="fw-bold total">{{formatMoney(totalIncomes)}}</span>
                </div>
            </div>
            <div class="col d-flex justify-content-end">      
              <router-link class="nav-link" to="/deposit">        
                <div class="row text-center">              
                  <button class="btn-transparent row">                   
                    <span class="icon">+</span>
                    <span >Deposit a Check</span>                                     
                </button>                   
              </div>
            </router-link>     
            </div>        
        </div>       
    </div>

    <div class="reg regExpense">
      <div class="row">
        <div class="col">
            <div class="row">
                <span class="fw-bold">Expenses</span>
            </div>
            <div class="row">
                <span class="fw-bold total">{{formatMoney(totalExpenses) }}</span>
            </div>
        </div>
        <div class="col d-flex justify-content-end">   
          <router-link class="nav-link" to="/purchase">                  
            <div class="row text-center">
              <button class="btn-transparent row">
                <span class="icon">+</span>
                <span >Purchase</span>
              </button>            
            </div>
          </router-link>     
        </div>        
    </div>       
  </div>
  
  </div>
</template>  
<script>
  import UtilFunctions from '../mixins/UtilFunctions.js'
  
  export default {
    name: 'LineTransactionHome',    
    mixins: [UtilFunctions],   
    computed: {             
      totalIncomes() {        
        return this.$store.state.transaction.totalIncomes;
      },
      totalExpenses() {
        return this.$store.state.transaction.totalExpenses;
      },   
    },
  }
  </script>
    
  <style scoped>

  .btn-transparent {
    width: 200px;    
    background-color:transparent;
    border:0; 
    border-radius:10px;
    font-size: 12px;
    text-transform: uppercase;
  }

  .btn-transparent:hover {
    background-color:#74bcf7;color:white;
   }

    
  .reg {    
    padding: 20px;
    background-color: #daefff;
  }

  .regIncome {
    background-color: #daefff;
  }

  .regExpense {
    background-color: #f1f9fe;
  }
  
  p {
    padding: 0;
  }

  .icon {
    font-size: 20px;
  }

  .add {
    width:180px;
  }

  .total {
    font-size: 20px;
  } 

  span {
    color: #2c9cf9;
  }
  
  </style>
  