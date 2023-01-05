import moment from 'moment';

const UtilFunctions = {
    data() {
      return { count: 0 }
    },
    methods: {
      formatMoney(money) {        
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'USD',
        });      
        return formatter.format(money);      
      },
      currentMonth(){           
        return moment().format('MM-YYYY');             
      },     
      formatDate(date) {
        if (date) {
          const obj = moment(date);
          return obj.format('M/D/YYYY, hh:mm A');
        }
      },         
    }
  }
  
  export default UtilFunctions;