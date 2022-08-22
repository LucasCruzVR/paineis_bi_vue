<template>
  <div class="header">
    <div class="nav">
      <div class="container">
        <div class="versao">v1.0.0</div>
        <div class="dados">
          <img
            src="../assets/images/perfil-icon.png"
            alt="ícone perfil do usuário"
          />
          <span>{{ nomeUsuarioLogado }}</span>
          <span title="sair" @click="logout"><IconSair /></span>
        </div>
      </div>
    </div>
    <div class="area-menu">
      <div class="container">
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
  </div>
</template>

<script>
import listaMenuPermissoes from "../listaMenuPermissoes";
import * as Auth from "@/services/Auth";
import { LOGIN_ROTA } from "@/router/nomeRotas";
import LogoPaineisInterno from "../assets/images/logo-interno.svg";
import IconSair from "../assets/images/icon-sair.svg";

export default {
  name: "HeaderApp",
  props: {
    componentDinamico: {
      type: Object,
    },
  },
  components: {
    LogoPaineisInterno,
    IconSair,
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
      const nomeCompleto = this.usuarioLogado.nome.split(" ");
      return nomeCompleto[0] + " " + nomeCompleto[nomeCompleto.length - 1];
    },
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
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: white;
      img {
        height: 1.5rem;
      }
      svg {
        height: 1.5rem;
        fill: rgb(243, 190, 0);
        cursor: pointer;
      }
    }
  }
}
.area-menu {
  background-color: #f2f2f0;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
    position: relative;
    svg {
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
    input:checked ~ ul {
      height: 9rem;
      padding: 1.5rem 0;
    }
    ul {
      display: grid;
      position: absolute;
      width: 100%;
      left: 0;
      top: 6.4rem;
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: #225f49;
      text-align: center;
      color: white;
      height: 0;
      overflow: hidden;
      transition: 0.3s ease-in-out;
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
}
@media screen and (min-width: "50em") {
  .area-menu {
    .container {
      label {
        display: none;
      }
      ul {
        display: flex;
        gap: 1rem;
        position: static;
        height: auto;
        width: auto;
        padding: none;
        background-color: transparent;
        li {
          a {
            color: #242424;
            padding: 0.5rem 2rem;
            border: solid 0.1rem #242424;
            cursor: pointer;
            font-family: "Poppins-medium";
            transition: 0.1s ease-in-out;
          }
          a:hover {
            color: white;
            background-color: #242424;
          }
        }
      }
    }
  }
}
@media print {
  .header {
    display: none;
  }
}
</style>