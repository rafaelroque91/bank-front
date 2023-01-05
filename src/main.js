import { createApp } from 'vue'

import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store'

import { faScaleUnbalancedFlip, faArrowTurnDown, faArrowTurnUp, faMoneyCheckDollar, faRightFromBracket,
    faStar, faCloudArrowUp, faCalendarDays, faUser, faEnvelope, faFile,
    faCircleXmark,faCircleCheck} from '@fortawesome/free-solid-svg-icons'
     
const myApp = createApp(App).use(store).use(router).use(router)

library.add(faScaleUnbalancedFlip,faArrowTurnDown,faArrowTurnUp, faMoneyCheckDollar, faRightFromBracket,
    faStar,faCloudArrowUp, faCalendarDays, faUser, faEnvelope, faFile, faCircleXmark, faCircleCheck);

myApp.component('font-awesome-icon', FontAwesomeIcon)
myApp.mount('#app')