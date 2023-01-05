<template>    
  <div>
    <div class="row reg">
      <div class="col">
        <div class="row">
          <span class="fw-bold">{{description}}</span>
        </div>
        <div class="row">
          <span>{{formatDate(date)}}</span>
        </div>
      </div>
        <div class="col text-end">          
            <p v-if="type ==0" class="fw-bold total text-blue"><span  v-if="showSign">+</span> {{formatMoney(amount)}}</p>             
            <p v-else class="text-danger fw-bold total"><span class="text-danger" v-if="showSign">-</span> {{formatMoney(amount)}}</p>  
        </div>        
    </div>
    <hr class="m-0"/>
  </div>
</template>
  
<script>
  import UtilFunctions from '../mixins/UtilFunctions.js'
  export default {
    name: 'LineTransaction',
    mixins: [UtilFunctions],
    props: {
      description : String,
      date : String,
      amount : Number,
      type: String,
      showSign: Boolean
    },           
  }
</script>

<style scoped>
  .reg {    
    margin: 5px;
  }

  span {
    color: #2c9cf9;
  }

  p {
    padding: 0;
  }

  .total {
    padding-top:12px;
  } 

  hr {    
    color: #2c9cf9;
  }

  .text-blue {
    color: #2c9cf9;
  }

</style>
  