import VueRouter from "vue-router";
import * as nomeRotas from "./nomeRotas";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Vue from "vue";
import SemPermissao from '@/views/SemPermissao'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: "/sessao/autenticar",
            component: Login,
            name: nomeRotas.LOGIN_ROTA,
        },
        {
            path: "/sem-permissao",
            name: nomeRotas.SEM_PERMISSAO,
            component: SemPermissao
        },
        {
            path: "*",
            redirect: "/sessao/autenticar"
        },
        {
            path: "/",
            redirect: "/sessao/autenticar"
        },
        {
            path: "/paineis",
            component: Index,
            name: nomeRotas.PAINEIS_INDEX
        }
    ],
    mode: 'history',
})

export default router;