import Vue from 'vue'
import Router from 'vue-router';


/// App components
import RateComponent from './components/RateComponent';
import AboutUs from './components/AboutUsComponent';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "rates",
            component: RateComponent
        },
        {
            path: "/Aboutus",
            name: "aboutus",
            component: AboutUs
        }
    ]
})