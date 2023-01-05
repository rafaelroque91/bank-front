<template>
  <div id="div-nav" class="bg-light">
    <nav class="navbar bg-light fixed-top">
      <div class="container-fluid">     
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <span class="fw-bold title">{{ title }}</span>    
        <div></div>           
      </div>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title" id="offcanvasNavbarLabel">BNB Bank</h3>              
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" v-if="isAdmin == 0">                               
              <router-link class="nav-link text-white" to="/">
                <font-awesome-icon icon="fa-solid fa-scale-unbalanced-flip" />
                  <span class="menu-item">BALANCE</span>
                </router-link>                                                                        
            </li>
            <li class="nav-item" v-if="!isAdmin">                                
              <router-link class="nav-link text-white" to="/incomes">                    
                <font-awesome-icon icon="fa-solid fa-arrow-turn-up" />
                  <span class="menu-item">INCOMES</span>
                </router-link>                                                                        
            </li>           
            <li class="nav-item" v-if="!isAdmin">                                
              <router-link class="nav-link text-white" to="/expenses">                    
                <font-awesome-icon icon="fa-solid fa-arrow-turn-down" />
                <span class="menu-item">EXPENSES</span>
              </router-link>                                                                        
            </li>
            <li class="nav-item" v-if="!isAdmin">                                
              <router-link class="nav-link text-white" to="/checks">                    
                <font-awesome-icon icon="fa-solid fa-money-check-dollar" /> 
                <span class="menu-item">CHECKS</span>
              </router-link>                                                                        
            </li>
            <li class="nav-item" v-if="isAdmin">                                
              <router-link class="nav-link text-white" to="/checkcontrol">                    
                <font-awesome-icon icon="fa-solid fa-money-check-dollar" /> 
                <span class="menu-item">CHECKS CONTROL</span>
              </router-link>                                                                        
            </li>
            <li class="nav-item">                               
              <router-link class="nav-link text-white" to="/logoff">                    
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                <span class="menu-item">LOGOFF</span>
              </router-link>                                                                        
            </li>                                                  
          </ul>            
        </div>                              
      </div>          
    </nav>  
  </div>
</template>

<script>
export default {
  name: 'SystemMenu',  
  props: {
    'title': String
  },  
  computed: {      
    isAdmin(){
      return this.$store.state.login.isAdmin;    
    }                
  }
}
</script>

<style scoped>

#div-nav {
  margin-top: 70px;
}

.offcanvas{
  max-width: 70%;
}

.navbar {
  background-color: #86bdf0 !important; 
}

.offcanvas-header {
  background-color: #bde0fe;
}

.offcanvas-title {
  color: white;
}

.title {
  color: white;
}

.container-fluid {
  height: 55px;
}

span {
  font-size: 18px;
}

.offcanvas-body {
  background-color: #2799fb;
}

.navbar-toggler {
  border:0;
  
}
.navbar-toggler-icon {
  color : #3b96ff;
} 

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.navbar-toggler {
  border-color: white;
} 

h3 {
  padding: 15px;
}

a {
  margin: 10px;
}

.menu-item {
  margin: 20px;
  font-size: 15px;
  text-transform: uppercase;
}

svg {
  width: 20px;
}

</style>
