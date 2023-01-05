<template>    
  <div>
    <SystemMenu title="BNB Bank"/>
    <div id="div-home" class="row">
      <MessageShow :response="response" redirectRoute=""/> 

      <div class="row text-left col">
        <span class="small">Current Balance</span>     
        <span class="balance text-white" v-if="currentBalance >= 0">{{formatMoney(currentBalance)}}</span>     
        <span class="balance text-danger" v-else>{{formatMoney(currentBalance)}}</span>            
      </div>  
      <div class="col d-flex justify-content-end" id="div-calendar" @change="getTransactions">
        <select class="form-select " aria-label="Default select example" v-model="dateFilter" >
          <option v-for="(m,index) in months" :value="index" :key="m">{{m}}</option>                     
        </select>
      </div>
    </div>
    <line-transaction-home />  
    <div class="row">
      <span class="lb-transaction">TRANSACTIONS</span>
    </div>    
    <LineTransaction 
      :description ="t.description" 
      :date="t.due_date"
      :amount="t.amount"   
      :type="t.type"
      :show-sign=true
       v-for="t in transactions" :key= "t.id"     
    />
    <div v-if="transactions == 0">
      <NoRecords />            
    </div>
  </div>
</template>
  
<script>  
  import SystemMenu from '@/components/SystemMenu.vue';
  import LineTransactionHome from '@/components/LineTransactionHome.vue';
  import LineTransaction from '@/components/LineTransaction.vue';    
  import UtilFunctions from '@/mixins/UtilFunctions.js'
  import NoRecords from '@/components/NoRecords.vue';  
  import MessageShow from "@/components/MessageShow.vue";

  export default {
    name: 'HomeView',    
    mixins: [UtilFunctions],    
    data() {
      return {
        dateFilter : null,
        response : ''        
      }
    },
    components: {            
      SystemMenu,     
      LineTransactionHome,
      LineTransaction,
      NoRecords,
      MessageShow  
    },       
    methods:{
      async getTransactions() {
        await this.$store.dispatch("getTransactions",this.dateFilter); 
        
        if (this.$store.state.transaction.transactions) {
          this.transactions = this.$store.state.transaction.transactions;          
        } else {
          this.response = this.$store.state.transaction.response;          
        }
      }, 
      getCurrentMonth(){
        this.dateFilter = this.currentMonth();
      },
      async getMonths() {        
        await this.$store.dispatch("getMonths");              
      },
    },
    mounted() {
      this.getMonths();
      this.getCurrentMonth();
      this.getTransactions();            
    },
    computed: {
      transactions() {        
        return this.$store.state.transaction.transactions;
      },     
      currentBalance() {               
        return this.$store.state.transaction.currentBalance;        
      },  
      months(){
        return this.$store.state.transaction.months;    
      }   
    },
  }
</script>
    
<style scoped>

  span {
    color: #2c9cf9;
  }

  .lb-transaction {
    margin: 5px;
    margin-bottom: 10px;
  }

  #div-home {    
    margin-left:0px;
    background-color: #86bdf0 !important;
    color: white;
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

  .balance {
    font-size: 25px;
    font-weight: bold;    
  }

  .small {
    font-size: 15px;
    color: white !important;
  }

  select {
    margin-top: 35px !important;
    border: 0;
    margin-top:0px;
    background-color: transparent;
    color: white;
    font-size: 20px;        
    width: auto;
    padding-right: 20px;
  }

  select option {
    background: #86bdf0 !important;
    font-size: 15px;
    color: #fff;
   
  }  
</style>
  