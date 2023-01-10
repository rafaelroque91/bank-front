<template>    
  <div class="view">    
    <SystemMenu title="Checks Control"/>        
    <div class="list-check">              
      <div class="check-item" v-for="c in checks" :key="c.id">
        <LineTransaction 
          :description ="c.user.email" 
          :date="c.created_at"
          :amount="c.amount"   
          :type="0"
          :show-sign=false   
          @click="showDetails(c.id)"           
        />   
      </div>         
    </div>                                  
    <div v-if="checks == 0">
      <NoRecords />            
    </div>     
  </div>
</template>
  
<script>  
  import SystemMenu from '@/components/SystemMenu.vue';
  import LineTransaction from '@/components/LineTransaction.vue';    
  import NoRecords from '@/components/NoRecords.vue';
  import UtilFunctions from '../mixins/UtilFunctions.js'    

  export default {
    name: 'ChecksControlView',   
    mixins: [UtilFunctions],  
    data() {
      return {
       dateFilter : null          
      }
    },
    components: {            
      SystemMenu,             
      LineTransaction,        
      NoRecords   
    },  
    methods: {
      async getChecks() {       
        await this.$store.dispatch("getChecksToApprove"); 
        if (this.$store.state.transaction.checks) {         
          this.checks = this.$store.state.transaction.checks;                
        }        
      },
      showDetails(id){     
        this.$router.push({
          name: "CheckDetailsView",
          params: { id: id },
        });
      }      
    },            
    beforeMount() {        
      this.getChecks();      
    },   
    computed: {      
      checks(){        
        return this.$store.state.transaction.checks;    
      }           
    },  
  }
</script>
    
<style scoped>
  .list-check{
    margin-top: 90px;
  }
  .check-item {
    cursor: pointer;
  }   

  .view {
    overflow:auto;
  }
</style>
  