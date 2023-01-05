<template>    
    <div>
      <LineTransaction />
      <LineTransaction />
      <LineTransaction />
      <LineTransaction />
    </div>
</template>
  
  <script>
  import LineTransaction from '@/components/LineTransaction.vue';

  export default {
    name: 'ExpensesList',
    components: {
      LineTransaction
    },
    props: {
      msg: String
    }
  }
  </script>
    
  <style scoped>
  
  </style>
  