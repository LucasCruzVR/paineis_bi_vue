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
      <input id="atv-menu" type="checkbox" />
      <label for="atv-menu">
        <div class="menu">
          <span class="hamburger"></span>
        </div>
      </label>
      <ul>
        <li v-for="menu in menus" :key="menu.nome">
          <a
            v-if="usuarioLogado.funcionalidades.includes(menu.permissao)"
            @click="escolherComponent(menu)"
            >{{ menu.nome }}</a
          >
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
  .container {
    display: flex;
    justify-content: space-between;
    .versao {
      color: white;
      font-size: 0.8em;
    }
    .dados {
      display: flex;
      color: white;
      font-size: 0.8em;
    }
  }
}
.area-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  position: relative;
  svg{
    margin-left: 1rem;
  }
  .menu {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 2rem;
    right: 1rem;
    z-index: 3;

    .hamburger {
      display: block;
      background-color: #225f49;
      width: 1.4rem;
      height: 2px;
      position: relative;
      z-index: 12;
      margin: 1rem auto;
    }

    .hamburger::before,
    .hamburger::after {
      background-color: #225f49;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      transition: 0.5s ease-in-out;
    }

    .hamburger::before {
      top: 0.4em;
    }

    .hamburger::after {
      bottom: 0.35em;
    }
  }

  input {
    display: none;
  }
  input:checked ~ nav {
    top: 3rem;
  }
  input:checked ~ label {
    .hamburger {
      transform: rotate(45deg);
    }

    .hamburger::before,
    .hamburger::after {
      transform: rotate(90deg);
      top: 0;
    }
  }
  ul {
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
    li {
      display: block;
    }
    a {
      padding: 1rem 0;
      font-family: "Poppins-Semibold";
      display: grid;
    }
  }
}
</style>