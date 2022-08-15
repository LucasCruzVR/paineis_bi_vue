<template>
  <div class="carregar" :class="classeTamanho">
    <div class="c-loader"></div>
    <p v-if='texto'>{{texto}}</p>
  </div>
</template>

<script>
// Props: size pode ser 'small', 'medium' ou 'large'
export default {
  name: "AppLoading",
  props: {
    size: {
      type: String,
    },
    texto: {
      type: String,
      // default: 'Carregando...'
    }
  },
  computed: {
    classeTamanho: function() {
      return {
        pequeno: this.size === "small",
        grande: this.size === "large",
        medio: this.size === "medium" || !this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.pequeno {
  text-align: center;
  .c-loader {
    animation: is-rotating 1s infinite;
    border: 0.3rem solid #edf2ee;
    border-radius: 50%;
    border-top-color: #00773d;
    height: 1.5rem;
    width: 1.5rem;
    margin: auto;
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
}
.medio {
  text-align: center;
  .c-loader {
    animation: is-rotating 1s infinite;
    border: 0.6rem solid #edf2ee;
    border-radius: 50%;
    border-top-color: #00773d;
    height: 3rem;
    width: 3rem;
    margin: 1rem auto;
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
}
.grande {
  text-align: center;
  .c-loader {
    animation: is-rotating 1s infinite;
    border: 0.8rem solid #edf2ee;
    border-radius: 50%;
    border-top-color: #00773d;
    height: 5rem;
    width: 5rem;
    margin: auto;
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
