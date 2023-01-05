<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card rounded-4 my-5">
          <div class="card-header">
            <h3 class="card-title text-center mb-0">BNB Bank</h3>
          </div>
          <div class="card-body p-4 p-sm-5 rounded-4">   
            <MessageShow :response="response"/>    
            <form @submit.prevent="Login()">
              <div class="row">
                <div class="lbl-form fw-bold">
                  <label for="username">E-mail</label>        
                </div>
                <div class="form-group">          
                  <input v-model="username" type="email" class="form-control" id="username">
                </div>
              </div>
              <div class="row">
                <div class="lbl-form fw-bold">
                  <label for="password">Password</label>        
                </div>
                <div class="form-group">          
                  <input v-model="password" type="password" class="form-control" id="password">
                </div>
              </div>
              <div class="row">                       
                <input type="submit" class="btn btn-primary btn-login text-uppercase fw-bold" value="Sign in" />
              </div>  
              <div class="row justify-content-center div-hr">
                <hr />            
                <router-link class="text-white" to="/register">   
                  <div class="row justify-content-center">
                  <button class="btn btn-link">Don't have an account? register</button>
                </div>
                </router-link>                             
              </div>    
            </form>        
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MessageShow from "@/components/MessageShow.vue";
  export default {
    name: 'LoginView',
    components: {
      MessageShow
    },
    data() {
      return {
        username : '',
        password : '',
        response : '',
        loader : null
      }
    },
    mounted(){    
      const token = localStorage.getItem('token');    
      this.$store.dispatch("setAccessToken", token);    
    },
    methods: {
      async Login() {  
        this.loader = this.$loading.show({       
          color: '#2c9cf9',
          container: null ,
          canCancel: false,                  
        });  

        const data = {
          username: this.username,
          password: this.password
        }    
        await this.$store.dispatch("login", data); 
        if (this.$store.state.login.access_token) {                                 
          this.redirectHomepage();
        } else {
          this.loader.hide();  
          this.response = this.$store.state.login.response                                
        }
      },
      async redirectHomepage(){      
        await this.$store.dispatch("getUserData");       
        if (this.$store.state.login.admin) {
          this.$router.push("/checkcontrol");
        } else {
          this.$router.push("/");
        }         
        this.loader.hide();    
      }
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

  .btn-login{
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
</style>
