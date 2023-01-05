<template>
  <div id="div-btn"  class="position-fixed bottom-0 end-0">
    <router-link :to='route'>
      <button >+</button>
    </router-link>        
  </div>
</template>
  
  <script>
  export default {
    name: 'PlusButton',
    props: {
      route : String
    } 
  }
  </script>
  
  <style scoped>  
    button {
        border: 0;
        background-color:  rgb(37, 150, 190);
        border-color:  rgb(37, 150, 190);
        width: 50px;
        height: 50px;
        padding: 2px 10px;
        border-radius: 60px;
        font-size: 30px;
        text-align: center;
        color: white;
    }

    button:hover {        
        background-color:  rgb(98, 178, 207);                
    }

    #div-btn {
       margin: 30px;
    }
  </style>
  