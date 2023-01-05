<template>    
  <div class="view">
    <SystemMenu title="Expenses"/>
    
    <MessageShow :response="response" redirectRoute=""/> 

    <div id="div-home" class="row">       
      <div class="col d-flex justify-content-start" id="div-calendar" @change="getExpenses">
        <select class="form-select " aria-label="Default select example" v-model="dateFilter" >
          <option v-for="(m,index) in months" :value="index" :key="m">{{m}}</option>                     
        </select>
      </div>
    </div>
    <div class="expenses">
      <LineTransaction 
        :description ="e.description" 
        :date="e.due_date"
        :amount="e.amount"   
        :type="1"
        :showSign=true
        v-for="e in expenses" :key= "e.id"     
      />
      <div v-if="expenses == 0">
        <NoRecords />            
      </div>
    </div>
    <PlusButton route='/purchase' />
  </div>
</template>
  
<script>  
  import SystemMenu from '@/components/SystemMenu.vue';
  import LineTransaction from '@/components/LineTransaction.vue';  
  import PlusButton from '@/components/PlusButton.vue';
  import UtilFunctions from '@/mixins/UtilFunctions.js'
  import NoRecords from '@/components/NoRecords.vue';
  import TransactionService from "@/services/transaction.service.js";
  import MessageShow from "@/components/MessageShow.vue";

  export default {
    name: 'ExpensesView',
    mixins: [UtilFunctions],    
    data() {
      return {
        expenses : [],
        dateFilter : null,
        response : ''        
      }
    },
    components: {            
      SystemMenu,             
      LineTransaction,
      PlusButton,
      NoRecords,
      MessageShow
    },       
    methods:{
      async getIncomes() {              
        TransactionService.getUserIncomes(this.dateFilter).then((r) => {        
          this.incomes = r.data.data;                    
        }).catch((r) => {          
          this.response = r;  
        });     
      },
      async getExpenses() {
        TransactionService.getUserExpenses(this.dateFilter).then((r) => {        
          this.expenses = r.data.data;                    
        }).catch((r) => {          
          this.response = r;  
        });  
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
      this.getExpenses(); 
    },
    computed: {      
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

.form-select {
  padding : 0;
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
    color: white !important;
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
    font-size: 18px;
    width: 200px;
  }

  select option {
    background: #86bdf0 !important;
    color: #fff;
  }

  .expenses {
    margin-top:30px;
    min-height: 300px;
  }
  .view {
    overflow:scroll;
  } 
</style>
  