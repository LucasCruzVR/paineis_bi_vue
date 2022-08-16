<template>
  <div class="login">
    <div class="area-logo">
      <LogoPaineis />
    </div>
    <div class="caixa-login">
      <h1>Login</h1>
      <span class="bemvindo">Bem Vindo. Por favor, entre com sua conta!</span>
      <form @submit.prevent="fazerLogin">
        <div class="msg-erro" v-show="erro">
          {{ erro }}
        </div>
        <div>
          <span>Usuário:</span>
          <input type="text" v-model="usuario" />
        </div>
        <div>
          <span>Senha:</span>
          <input type="password" v-model="senha" />
        </div>
        <div>
          <button v-if="!salvando" type="submit">Entrar</button>
          <AppLoading v-if="salvando" />
        </div>
      </form>
      <img src="../assets/images/logo-estado.png" alt="Logo da SIC e Brasão do Estado de Estado de Goias" class="logo-estado">
    </div>
  </div>
</template>

<script>
import * as Auth from "../services/Auth";
import { PAINEIS_INDEX } from "@/router/nomeRotas";
import AppLoading from "@/components/AppLoading";
import LogoPaineis from "../assets/images/logo-paineis.svg";

export default {
  name: "TelaLogin",
  components: {
    AppLoading,
    LogoPaineis,
  },
  data() {
    return {
      usuario: "",
      senha: "",
      erro: "",
      salvando: false,
    };
  },
  mounted() {
    if (Auth.isLoggedIn()) {
      this.$router.push({ name: PAINEIS_INDEX });
    }
  },
  methods: {
    async fazerLogin() {
      try {
        this.erro = "";
        this.salvando = true;
        await Auth.login(this.usuario, this.senha);
        if (Auth.getUsuario()) {
          this.salvando = false;
          this.$router.push({ name: PAINEIS_INDEX });
        }
      } catch (err) {
        this.salvando = false;
        this.erro =
          err ||
          "Houve um erro ao efetuar o login. Por favor, tente novamente.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #225f49;
  background-image: url("../assets/images/bg-login.png");
  background-position: left;
  background-size: cover;
  background-blend-mode: soft-light;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .area-logo{
    margin: 0rem auto;
    text-align: center;
    svg{
      width: 80%;
    }
  }
  .caixa-login {
    display: grid;
    gap: 1rem;
    background-color: rgb(245, 245, 245);
    margin: 2rem;
    padding: 2rem;
    box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.25);
    max-width: 30rem;
    h1 {
      margin: 0;
      color: #333;
      font-family: 'Poppins-Semibold';
    }
    .bemvindo{
      color: #575757;
    }
    .msg-erro{
      background-color: rgb(184, 21, 21);
      color: white;
      padding: .3rem 1rem;
    }
    form{
      display: grid;
      gap: 1rem;
      div{
        display: grid;
      }
      input{
        height: 2rem;
        border-radius: .3rem;
        border: 1px solid #B5B5B5;
        width: 100%;
        padding-left: 1rem;
      }
      button{
        background-color: #333333;
        font-size: 1em;
        padding: .5rem 2rem;
        color: white;
        font-family: 'Poppins-Medium';
        border: none;
        border-radius: .3rem;
        margin: 2rem 0;
        transition: ease-in-out .2s;
      }
      button:hover{
        background-color: #000000;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.041);
      }
    }
    .logo-estado{
      height: 5rem;
      margin: 0 auto;
    }
  }
}
@media screen and (min-width: "70rem") {
  .login{
    flex-direction: row;
    background-position: left;
    justify-content: space-between;
    .area-logo{
      svg{
        width: 25rem;
      }
    }
    .caixa-login{
      margin: 0;
      align-content: center;
      padding: 0 7rem 0 7rem;
      height: 100vh;
    }

  }
}
</style>