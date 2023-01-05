<template> 
    <div class="d-flex justify-content-center mt-3">
      <div class="alert alert-dismissible fade show" 
        v-show="message != ''" v-bind:class="{'alert-success' : success, 'alert-danger' : !success}" role="alert">
          <strong>{{message}}</strong>             
          <ul v-if="errors">
            <li v-for="e in errors" :key=e>{{e}}</li>            
          </ul>        
          <button type="button" class="btn-close" aria-label="Close" @click="cleanMesage()"></button>
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
      components: {            
        
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
            this.message = this.data.message;
          }         
        },
        redirect(){          
          if (this.redirectRoute) {            
            setTimeout(() => {
              this.$router.push("/"+this.redirectRoute); 
            }, "2000")          
          }
        },
        cleanMesage(){          
          this.message = '';          
        }
      },     
      computed: {
        success(){            
          this.parseResponse();     
          if (this.status == 200 || this.status == 201) {
            this.redirect();
            return true;
          }          
         return false; 
        }        
      }
    }
  </script>
      
  <style scoped>
   .alert {
    width: 90%;
   }
  </style>
    