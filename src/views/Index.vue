<template>
    <div>
        <Header @escolherComponent="renderizaComponent" :componentDinamico="componentDinamico"/>
        <component :is="componentDinamico.component"></component>
    </div>
</template>

<script>
import Header from "../components/Header.vue"
import ProgramasFomento from "@/components/paineis_show/ProgramasFomento.vue"
import Mineracao from "@/components/paineis_show/Mineracao.vue"
import * as Auth from '../services/Auth'
import { SEM_PERMISSAO } from "@/router/nomeRotas"
export default {
    name: "PaginaInicial",
    components: {
        Header,
        ProgramasFomento,
        Mineracao
    },
    data() {
        return {
            componentDinamico: {
                nome: '',
                component: '',
                permissao: ''
            }
        }
    },
    mounted() {
        if (!Auth.getUsuario()) {
            this.$router.push({name: SEM_PERMISSAO})
        }
    },
    methods: {
        renderizaComponent(menu) {
        this.componentDinamico = menu
    }
    }
}
</script>

<style scoped>

</style>