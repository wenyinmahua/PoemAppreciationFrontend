import { createRouter, createWebHistory} from 'vue-router'

import LayOut from "../layout/LayOut.vue";
import PoemDetailPage from "../pages/PoemDetailPage.vue";
import AuthorDetail from "../pages/AuthorDetailPage.vue";



const routes = [
    { path: '/', component: LayOut},
    { path:'/poem/detail', component: PoemDetailPage},
    { path: '/author/detail', component: AuthorDetail},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
