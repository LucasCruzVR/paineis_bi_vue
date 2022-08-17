<template>
  <div>
    <div class="nav">
      <div class="container">
        <div class="versao">v1.0.0</div>
        <div class="dados">
          <span>ICONE</span>
          <span>{{nomeUsuarioLogado}}</span>
          <span @click="logout">Sair</span>
        </div>
      </div>
    </div>
    <div class="container area-menu">
      <LogoPaineisInterno />
      <ul >
        <li v-for="menu in menus" :key="menu.nome"
          
        >
        <a v-if="usuarioLogado.funcionalidades.includes(menu.permissao)"
          @click="escolherComponent(menu)">{{ menu.nome }}</a>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import listaMenuPermissoes from "../listaMenuPermissoes";
import * as Auth from "@/services/Auth";
import { LOGIN_ROTA } from "@/router/nomeRotas";
import LogoPaineisInterno from "../assets/images/logo-interno.svg"
export default {
  name: "HeaderApp",
  props: {
    componentDinamico: {
      type: Object,
    },
  },
  components: {
    LogoPaineisInterno,
  },
  created() {
    this.menus = listaMenuPermissoes;
    this.usuarioLogado = Auth.getUsuario();
  },
  data() {
    return {
      menus: [],
      usuarioLogado: [],
    };
  },
  computed: {
    nomeUsuarioLogado() {
      const nomeCompleto = this.usuarioLogado.nome.split(" ")
      return nomeCompleto[0] + " " + nomeCompleto[nomeCompleto.length - 1]
    }
  },
  methods: {
    escolherComponent(menu) {
      this.$emit("escolherComponent", menu);
    },
    logout() {
      Auth.logout();
      this.$router.push({ name: LOGIN_ROTA });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #225f49;
  display: flex;
  .container{
    display: flex;
    justify-content: space-between;
    .versao{
      color: white;
      font-size: .8em;
    }
    .dados{
      display: flex;
      color: white;
      font-size: .8em;
    }
  }
}
.area-menu{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  position: relative;
  ul{
    display: grid;
    gap: 1rem;
    position: absolute;
    width: 100%;
    left: 0;
    top: 6.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #225f49;
    padding: 3rem 0;
    text-align: center;
    color: white;
    li{
      display: block;
    }
    a{
      padding: 1rem 0;
      font-family: 'Poppins-Semibold';
      display: grid;
    }
  }
}
</style>