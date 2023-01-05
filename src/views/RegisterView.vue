<template>
  <div class="container">   
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card rounded-4 my-5">
          <div class="card-header">
            <h3 class="card-title text-center mb-0">BNB Bank</h3>
          </div>
          <MessageShow :response="response" redirectRoute="login"/>     
          <form @submit.prevent="Register()">
            <div class="card-body p-4 p-sm-5 rounded-4">                       
              <div class="row">
                <div class="lbl-form fw-bold">
                  <label for="description">Username</label>        
                </div>
                <div class="form-group">          
                  <input v-model="username" type="text" class="form-control" id="description">
                </div>
              </div>
              <div class="row">
                <div class="lbl-form fw-bold">
                  <label for="description">E-mail</label>        
                </div>
                <div class="form-group">          
                  <input v-model="email" type="text" class="form-control" id="email">
                </div>
              </div>
              <div class="row">
                <div class="lbl-form fw-bold">
                  <label for="description">Password</label>        
                </div>
                <div class="form-group">          
                  <input v-model="password" type="password" class="form-control" id="description">
                </div>
              </div>
              <div class="row">    
                <input type="submit" class="btn btn-primary btn-register text-uppercase fw-bold" value="Sign Up" />                                 
              </div>  
              <div class="row justify-content-center div-hr">
                <hr />            
                <router-link class="text-white" to="/login">   
                  <div class="row justify-content-center">
                    <button type="button" class="btn btn-link">Already have an account?</button>                                           
                  </div>
                </router-link>                             
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginService from '@/services/login.service';
  import MessageShow from "@/components/MessageShow.vue";
  export default {
    name: 'RegisterView',
    components: {
      MessageShow
    },
    data() {
      return {
        username : '',
        password : '',
        email : '',
        response : '',        
      }
    },
    mounted(){      
    },
    methods: {
      async Register() {
        this.loader = this.$loading.show({       
          color: '#2c9cf9',
          container: null ,
          canCancel: false,                  
        });  
        const data = {
          username: this.username,
          email : this.email,
          password: this.password
        }   
          
        LoginService.register(data).then((r) => { 
          this.response = r;     
        }).catch((r) => {                  
          this.response = r;
        }).finally(() => {
          this.loader.hide();  
        });
      },     
    } 
  }
</script>

<style scoped>
  .div-hr {
  margin-top:30px;
  }

  .card-body {
    background-color: white;
  
  }
  .card-header {  
    background-color: #3b96ff;  
    border-color: #3b96ff;    

  }

  .card-title {
    margin-top:100px;
  }

  .btn {
    height:60px;
  }

  h3 {
    color: white;
  }

  input {
    color: #2c9cf9;
  }

  label {
    color: #2c9cf9;
  }

  .row {
    padding: 10px;
  }

  .lbl-form {
    opacity: 0.50;   
    font-size: 15px;
    margin-bottom: 5px;
  }

  span, input:hover {
    color: #2c9cf9;
  }

  .btn-register{
    color: white;
  }
</style>
