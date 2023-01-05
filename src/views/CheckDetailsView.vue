<template>    
  <div>    
    <SystemMenu title='Check Details'/>    
    <div class="container-fluid">        
      <MessageShow :response="response" redirectRoute="checkcontrol"/>    
      <div class="row">        
        <span class="lbl-form">
          <font-awesome-icon icon="fa-solid fa-user"/> Customer
        </span>                       
        <p class="values">{{check.user.username}}</p>        
      </div>
      <div class="row">        
        <span class="lbl-form">
          <font-awesome-icon icon="fa-solid fa-envelope"/> Customer Email
        </span>                         
        <p class="values">{{check.user.email}}</p>        
      </div>
      <div class="row">        
        <span class="lbl-form">
          <font-awesome-icon icon="fa-solid fa-file"/> Account
        </span>                         
        <p class="values">{{check.user.id}}</p>        
      </div>
      <div class="row">        
        <span class="lbl-form">
          <font-awesome-icon icon="fa-solid fa-money-check-dollar" /> Reported Amount
        </span>                         
        <p class="values">{{formatMoney(check.amount)}}</p>        
      </div>      
      <div class="row">
        <div class="form-group text-center">                        
          <div class="d-flex justify-content-center mt-3">
            <img class="check-image" :src="imageUrl" alt="" />                            
          </div>
        </div>
      </div>     
      <div class="row btn-row">
        <div class="form-group col d-flex justify-content-center ">
          <button id="btn-reject" class="btn btn-primary" @click="Reject()">
            <font-awesome-icon icon="fa-solid fa-circle-xmark" /> Reject
          </button>
        </div>
        <div class="form-group col d-flex justify-content-center">
          <button id="btn-accept" class="btn btn-primary" @click="Accept()">
            <font-awesome-icon icon="fa-solid fa-circle-check" class="text-white"/> Accept
          </button>
        </div>
      </div>         
    </div>
  </div>
</template>
  
<script>
  import { vMaska } from "maska"  
  import SystemMenu from '@/components/SystemMenu.vue';    
  import UtilFunctions from '../mixins/UtilFunctions.js'   
  import TransactionService from "@/services/transaction.service.js";
  import MessageShow from "@/components/MessageShow.vue";
  
  export default {
    name: 'CheckDetailsView',
    mixins: [UtilFunctions],
    data() {
      return {
        check : null,
        apiUrl : process.env.VUE_APP_API_URL, 
        response : ''
      }
    },
    components: {            
        SystemMenu,
        MessageShow
    },     
    beforeMount() {
      this.getCheckDetails();      
    },   
    methods:{
      getCheckDetails() {
        this.check = this.$store.state.transaction.checks.find(
          (check) => check.id == this.$route.params.id
        );      
      },
      async Accept(){  
        TransactionService.aproveCheck(this.check.id).then((r) => {  
          this.response = r;     
        }).catch((r) => {                  
          this.response = r;                     
        });       
      },
      async Reject(){      
        TransactionService.rejectCheck(this.check.id).then((r) => {                         
          this.response = r;     
        }).catch((r) => {                  
          this.response = r;                     
        });    
      }
    },
    computed: {      
      currentBalance() {        
        return this.$store.state.transaction.currentBalance;
      },  
      imageUrl(){
        return this.apiUrl+this.check.file_url;
      }        
    },
    directives: { maska: vMaska }    
  }
</script>
    
<style scoped>

  .row {
    padding: 10px;
    font-weight: bold;
  }
  .container-fluid {
    margin-top:120px;
  }

  .check-image {
    max-width:80%;
  }

  .btn {
    height: 50px;
    width: 70%;
    border-width: 4px;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
  }

  #btn-accept {
   background-color: #2799fb;
   border-color: #2799fb;
  }

  #btn-reject {
    background-color: white;
    border-color: #cde7fe;
    color: #399def;
   }

  .lbl-form {
    opacity: 0.55;   
    font-size: 13px;
    margin-bottom: 5px;
    color: #2c9cf9;
    text-transform: uppercase;
  }
  .input-group-text {
    background-color: transparent;
    border: 0;
  } 

  .values{
    color: #1879c9;
    opacity: 0.8;
    margin-left: 20px; 
    font-size: 25px;   
    font-weight: normal;   
  }
</style>
  