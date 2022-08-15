<template>
  <div>
    --ICONE PAINEIS SIC--
    <div>
      <ul v-for="menu in menus" :key="menu.nome">
        <li v-if="permissoesUsuarioLogado.includes(menu.permissao)" @click="escolherComponent(menu)">
          {{menu.nome}}
        </li>
      </ul>
    </div>
    <div>
      <span @click="logout">Sair</span>
    </div>
  </div>
</template>

<script>
//import Menu from "./Menu.vue";
import listaMenuPermissoes from '../listaMenuPermissoes'
import * as Auth from '@/services/Auth'
import { LOGIN_ROTA } from '@/router/nomeRotas';
export default {
  name: "HeaderApp",
  props: {
    componentDinamico: {
      type: Object
    }
  },
  created() {
     this.menus = listaMenuPermissoes
     this.permissoesUsuarioLogado = Auth.getUsuario().funcionalidades
  },
  data() {
    return {
      menus: [],
      permissoesUsuarioLogado: []
    }
  },
  methods: {
    escolherComponent(menu) {
      this.$emit('escolherComponent', menu)
    },
    logout() {
      Auth.logout()
      this.$router.push({name: LOGIN_ROTA})
    }
  }
};
</script>