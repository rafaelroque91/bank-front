<template> 
    <div class="d-flex justify-content-center mt-3">
      <div class="alert alert-dismissible fade show" 
        v-show="message != ''" v-bind:class="{'alert-success' : success, 'alert-danger' : !success}" role="alert">
          <strong>{{message}}</strong>             
          <ul v-if="errors">
            <li v-for="e in errors" :key=e>{{e}}</li>            
          </ul>        
          <button type="button" class="btn-close" aria-label="Close" @click="clearMessage()"></button>
      </div>      
    </div>
  </template>
    
  <script>     
    import UtilFunctions from '@/mixins/UtilFunctions.js'
    
    export default {
      name: 'MessageShow',    
      mixins: [UtilFunctions],
      props: {       
       redirectRoute : String,
       response : Object
      },            
      data() {
        return {          
          status : '',   
          data : null,       
          message : '',
          errors : []        
        }
      },          
      methods: {
        parseResponse(){    
          let response = this.response.response ? this.response.response : this.response;                
          if (response) {               
            this.status = response.status;
            this.data = response.data;        
            this.errors = '';
            if (this.data.errors){
              this.errors = this.data.errors;            
            }        

            if (this.redirectRoute && this.success) { 
              this.message = this.data.message + '. Redirecting...';      
            } else {
              this.message = this.data.message;    
            }
                           
            if (this.success) {          
              setTimeout(() => {
                this.redirect();              
              }, 2000);
            }
          }           
        },
        redirect(){          
          if (this.redirectRoute) {                      
              this.$router.push("/"+this.redirectRoute);    
          }
        },            
        clearMessage(){        
          this.message = '';          
        }
      },    
      watch: {
        response(value){
          this.parseResponse(value);          
        },    
      },
      computed: {
        success() {
          return  (this.status === 200 || this.status === 201);
        }
      }
    }
  </script>
      
  <style scoped>
   .alert {
    width: 90%;
   }
  </style>
    