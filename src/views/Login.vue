<template>
  <div>
    <h1>Login</h1>
    <span>Bem Vindo. Por favor, entre com sua conta!</span>
    <form @submit.prevent="fazerLogin">
      <div v-show="erro">
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
        <AppLoading v-if="salvando"/>
      </div>
    </form>
  </div>
</template>

<script>
import * as Auth from "../services/Auth";
import { PAINEIS_INDEX } from "@/router/nomeRotas";
import AppLoading from '@/components/AppLoading'
export default {
  name: "TelaLogin",
  components: {
    AppLoading
  },
  data() {
    return {
      usuario: "",
      senha: "",
      erro: "",
      salvando: false
    };
  },
  mounted() {
    if(Auth.isLoggedIn()) {
      this.$router.push({name: PAINEIS_INDEX})
    }
  },
  methods: {
    async fazerLogin() {
      try {
        this.erro = ""
        this.salvando = true
        await Auth.login(this.usuario, this.senha);
        if(Auth.getUsuario()) {
          this.salvando = false
          this.$router.push({name: PAINEIS_INDEX})
        }
      } catch (err) {
        this.salvando = false
        this.erro = err || "Houve um erro ao efetuar o login. Por favor, tente novamente.";
      }
    },
  },
};
</script>

<style scoped>
</style>