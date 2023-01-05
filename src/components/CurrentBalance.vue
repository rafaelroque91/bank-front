<template>      
  <div class="row bg-light" id="div-balance">
    <span class="small">Current Balance</span>         
    <span class="balance" v-if="balance >= 0">{{formatedBalance}}</span>     
    <span class="balance text-danger" v-else>{{formatedBalance}}</span>     
  </div>        
</template>
    
<script>  
  import UtilFunctions from '@/mixins/UtilFunctions.js'
  export default {
    name: 'CurrentBalance', 
    mixins: [UtilFunctions], 
    props: {
      balance: String
    },  
    computed: {
      formatedBalance() {        
        return this.formatMoney(this.balance);
      }    
    },   
  }
</script>
      
<style scoped>  
  #div-balance {
    margin-left:0px;
    color: #2c9cf9;
  }
  .balance {
    font-size: 25px;
    font-weight: bold;    
    opacity: 0.7;
  }
  .small {
    font-weight: bold;
    font-size: 12px;
    opacity: 0.5;
    text-transform: uppercase;
  }
</style>
    