<template>
  <div>
    --ICONE PAINEIS SIC--
    <div>
      <ul v-for="menu in menus" :key="menu.nome">
        <li v-if="usuarioLogado.funcionalidades.includes(menu.permissao)" @click="escolherComponent(menu)">
          {{menu.nome}}
        </li>
      </ul>
    </div>
    <div>
      <NomeUsuario :nome="usuarioLogado.nome"/>
      <IconePerfil/>
      <span @click="logout">Sair</span>
    </div>
  </div>
</template>

<script>
import listaMenuPermissoes from '../listaMenuPermissoes'
import * as Auth from '@/services/Auth'
import { LOGIN_ROTA } from '@/router/nomeRotas';
import NomeUsuario from './perfil_usuario/NomeUsuario.vue';
import IconePerfil from './perfil_usuario/IconePerfil.vue';
export default {
  name: "HeaderApp",
  props: {
    componentDinamico: {
      type: Object,
    }
  },
  components: {
    NomeUsuario,
    IconePerfil
},
  created() {
     this.menus = listaMenuPermissoes
     this.usuarioLogado = Auth.getUsuario()
  },
  data() {
    return {
      menus: [],
      usuarioLogado: []
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