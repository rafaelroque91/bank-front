<template>    
  <div>    
    <SystemMenu title='Purchase' />  
    <CurrentBalance :balance="currentBalance" />      
    <div class="container-fluid">         
      <MessageShow :response="response" redirectRoute="expenses"/>
      <div class="row">
        <div class="lbl-form fw-bold">
          <label for="amount"> <font-awesome-icon class="icon" icon="fa-solid fa-money-check-dollar"/> Amount</label>        
        </div>
        <div class="input-group mb-3">                    
          <input v-model="amount" type="text" id="amount" class="form-control" aria-label="Amount" 
          v-maska data-maska="999#,##" data-maska-tokens="9:[0-9]:repeated" data-maska-reversed>
          <span class="input-group-text">USD</span>
        </div>          
      </div>
      <div class="row">
        <div class="lbl-form fw-bold">
          <label for="due_date"> <font-awesome-icon icon="fa-solid fa-calendar-days" /> Date</label>        
        </div>
        <div class="form-group">          
          <input v-model="due_date" type="date" class="form-control" id="due_date">
        </div>
      </div>
      <div class="row">
        <div class="lbl-form fw-bold">
          <label for="description"> <font-awesome-icon icon="fa-solid fa-star" /> Description</label>        
        </div>
        <div class="form-group">          
          <input v-model="description" type="text" class="form-control" id="description">
        </div>
      </div>       
      <div class="row btn-row">
        <div class="form-group">
          <button class="btn btn-primary w-100" @click="Purchase">Add Purchase</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { vMaska } from "maska"  
  import SystemMenu from '@/components/SystemMenu.vue';
  import TransactionService from "@/services/transaction.service.js";
  import CurrentBalance from "@/components/CurrentBalance.vue";
  import MessageShow from "@/components/MessageShow.vue";
  
  export default {
    name: 'PurchaseView',
    components: {            
        SystemMenu,
        CurrentBalance,
        MessageShow  
    },  
    data(){
      return {
        description : '',
        amount : 0,
        due_date : null,
        response : ''
      }
    },  
    methods:{
      async getCurrentBalance() {
        await this.$store.dispatch("getCurrentBalance");         
        if (this.$store.state.transaction.currentBalance) {
          this.currentBalance = this.$store.state.transaction.currentBalance;          
        }
      },
      async Purchase() { 
        const data = {
          description: this.description,
          amount: this.amount.replace(",", "."),
          due_date : this.due_date
        }     
        TransactionService.purchase(data).then((r) => { 
          this.response = r;          
        }).catch((r) => {    
          this.response = r;             
        });    
      },      
    },
    mounted() {
      this.getCurrentBalance();
    },
    computed: {      
      currentBalance() {        
        return this.$store.state.transaction.currentBalance;
      },     
    },
    directives: { maska: vMaska }    
  }
</script>
    
<style scoped>

  #div-expenses {
    margin-left:0px;
    color: #2c9cf9;
  }

  input {
    color: #2c9cf9;
  }

  label {
    color: #2c9cf9;
  }
  .btn-row {
    margin-top: 100px;    
  }

  .btn-row button {
    height: 50px;
    font-size: 12px;
  }

  .row {
    padding: 10px;
  }

  .container-fluid {
    margin-top:30px;
  }

  .lbl-form {
    opacity: 0.50;   
    font-size: 15px;
    margin-bottom: 5px;
  }
  
  .input-group-text {
    background-color: transparent;
    border: 0;
  } 

  span, input:hover {
    color: #2c9cf9;
  }
</style>
  