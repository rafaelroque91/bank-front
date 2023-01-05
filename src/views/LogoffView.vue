<template>
  <h3>Logoff in progress. Please wait.</h3>
</template>
<script>
  export default {
    name: 'LogoffView',      
    mounted() {    
      this.$store.dispatch("logoff");
      this.$router.push("login");
    },
  };
</script>
