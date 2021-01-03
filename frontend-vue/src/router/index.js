import {createRouter, createWebHistory} from 'vue-router'
import PeopleIndex from '../views/PeopleIndex.vue'
import PersonEdit from "../views/PersonEdit";
import NotFound from "../views/NotFound";
import PersonAdd from "../views/PersonAdd";

const routes = [
    {
        path: '/',
        name: 'PeopleIndex',
        component: PeopleIndex
    },
    {
        path: '/people/edit/:personId',
        name: 'PersonEdit',
        component: PersonEdit
    },
    {
        path: '/people/add',
        name: 'PersonAdd',
        component: PersonAdd
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
