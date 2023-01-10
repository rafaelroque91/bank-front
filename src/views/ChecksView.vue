<template>    
  <div class="view">    
    <SystemMenu title="Checks"/>
    <div id="div-home" class="row">       
      <div class="col d-flex justify-content-start" id="div-calendar" @change="getChecks">
        <select class="form-select " aria-label="Default select example" v-model="dateFilter" >
          <option v-for="(m,index) in months" :value="index" :key="m">{{m}}</option>                     
        </select>
      </div>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item text-center" role="presentation">
        <button class="nav-link " id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending-tab-pane" type="button" role="tab" aria-controls="pending-tab-pane" aria-selected="true">Pending</button>
      </li>
      <li class="nav-item text-center" role="presentation">
        <button class="nav-link active" id="accepted-tab" data-bs-toggle="tab" data-bs-target="#accepted-tab-pane" type="button" role="tab" aria-controls="accepted-tab-pane" aria-selected="false">Accepted</button>
      </li>
      <li class="nav-item text-center" role="presentation">
        <button class="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected-tab-pane" type="button" role="tab" aria-controls="rejected-tab-pane" aria-selected="false">Rejected</button>
      </li>
    </ul>
    <div class="tab-content">    
      <div class="tab-pane fade" id="pending-tab-pane" role="tabpanel" aria-labelledby="pending-tab" tabindex="0">        
        <LineTransaction 
          :description ="c.description" 
          :date="c.created_at"
          :amount="c.amount"   
          :type="0"
          :show-sign=false
          v-for="c in checks.pending" :key= "c.id"     
        />
        <div v-if="checks.pending == 0">
          <NoRecords />            
        </div>
      </div>
      <div class="tab-pane fade active show" id="accepted-tab-pane" role="tabpanel" aria-labelledby="accepted-tab" tabindex="1">       
        <LineTransaction 
          :description ="c.description" 
          :date="c.due_date"
          :amount="c.amount"   
          :type="0"
          :show-sign=false
          v-for="c in checks.accepted" :key= "c.id"     
        />  
        <div v-if="checks.accepted == 0">
          <NoRecords />            
        </div>
      </div>  
      <div class="tab-pane fade" id="rejected-tab-pane" role="tabpanel" aria-labelledby="rejected-tab" tabindex="2">                
        <LineTransaction 
          :description ="c.description" 
          :date="c.created_at"
          :amount="c.amount"   
          :type="0"
          :show-sign=false
          v-for="c in checks.rejected" :key= "c.id"     
        />     
        <div v-if="checks.rejected == 0">
          <NoRecords />            
        </div>
      </div>
    </div>   
    <PlusButton route='/deposit' />
  </div>
</template>
  
<script>  
  import SystemMenu from '@/components/SystemMenu.vue';
  import LineTransaction from '@/components/LineTransaction.vue';  
  import PlusButton from '@/components/PlusButton.vue';
  import NoRecords from '@/components/NoRecords.vue';
  import UtilFunctions from '../mixins/UtilFunctions.js'

  export default {
    name: 'ChecksView',   
    mixins: [UtilFunctions],  
    data() {
      return {
        dateFilter : null        
      }
    },
    components: {            
        SystemMenu,             
        LineTransaction,
        PlusButton,
        NoRecords   
    },           
    methods:{
      async getChecks() {
        await this.$store.dispatch("getChecks",this.dateFilter); 
        
        if (this.$store.state.transaction.expenses) {
          this.checks = this.$store.state.transaction.checks;
        } else {
          alert(this.$store.state.transaction.message);
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
      this.getChecks();      
    },  
    computed: {
      checks() {        
        console.log('checksss',this.$store.state.transaction.checks);
        return this.$store.state.transaction.checks;
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

  .nav-link {
    color: #2c9cf9 ;
    width:100%; 
  }

  .nav-item {
    width:33%; 
  }

  .active {
    color: #2c9cf9 ;    
  }

  .nav {
    margin-top: 30px;
  }

  .view {
    overflow:auto;
  }
</style>
  