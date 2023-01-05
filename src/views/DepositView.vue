<template>    
  <div>    
    <SystemMenu title='Check Deposit'/>  
    <CurrentBalance :balance="currentBalance" />          
    <div class="container-fluid"> 
      <MessageShow :response="response" redirectRoute="checks"/>    
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
          <label for="description"> <font-awesome-icon icon="fa-solid fa-star" /> Description</label>        
        </div>
        <div class="form-group">          
          <input v-model="description" type="text" class="form-control" id="description">
        </div>
      </div>
      <div class="row">
        <div class="form-group text-center">               
          <div class="btn" id="btn-upload" @click="triggerFileUpload()">
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" class="fa-3x icon-upload" />
            <p>UPLOAD CHECK PICTURE</p>
            <input class="form-control" type="file" id="imageFile" accept="image/gif, image/jpeg, image/png"  @change="readURL()">            
          </div>  
          <div class="d-flex justify-content-center mt-3" @click="triggerFileUpload()">
            <img id="preview" :src="imagesrc" alt="" />                            
          </div>
        </div>
      </div>        
      <div class="row btn-row">
        <div class="form-group">
          <button class="btn btn-primary w-100" @click="Deposit">DEPOSIT CHECK</button>
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
    name: 'DepositView',
    components: {            
        SystemMenu,
        CurrentBalance,
        MessageShow  
    },  
    data(){
      return {
        description : '',
        amount : 0,
        image : null,
        imagesrc : '',
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
      async Deposit() {         
        let data = new FormData();        
        data.append("description", this.description);
        data.append("check", this.image);
        data.append("amount",this.amount.replace(",", "."))        

        TransactionService.depositCheck(data).then((r) => {          
          this.response = r;     
        }).catch((r) => {                  
          this.response = r;            
        });               
      },
      triggerFileUpload(){
        const input = document.getElementById('imageFile');
        input.click();
      },
      readURL(input) {
        input = document.getElementById('imageFile');

        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = e => this.imagesrc = e.target.result;
          
          reader.readAsDataURL(input.files[0]);
          this.image = input.files[0];
        }
        const div = document.getElementById('btn-upload');       
        div.classList.add("d-none");
      }
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

  .balance {
    font-size: 20px;
    font-weight: bold;    
    opacity: 0.7;
  }

  .small {
    font-weight: bold;
    font-size: 12px;
    opacity: 0.5;
    text-transform: uppercase;
  }

  .container-fluid {
    margin-top:30px;
  }

  #preview{
    max-width:100%;
  }

  #imageFile {
    display: none;    
  }

  #btn-upload{
    background-color: transparent;
    border-style:dashed;
    border-width: 2px;
    border-color: #2c9cf9;
    width: 80%;
    height: 100px;
    opacity: 0.5;
  }

  #btn-upload p {
    color: #2c9cf9;
    font-weight: bold;
  }

  .icon-upload{
    color:  #2c9cf9;
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
  