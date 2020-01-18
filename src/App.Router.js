import Vue from 'vue'
import Router from 'vue-router';

/// Nprogress
import NProgress from 'nprogress';

/// App components
import RateComponent from './components/RateComponent';
import AdminComponent from './components/AdminComponent';
import AboutUs from './components/AboutUsComponent';

Vue.use(Router);

/// routes
const routes = [
    {
        path: "/editMe903672",
        name: "admin",
        component: AdminComponent
    },
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
];


/// Nprogress events
const router = new Router({ routes: routes });
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})
router.afterEach(() => {
    NProgress.done()
})

export default router;