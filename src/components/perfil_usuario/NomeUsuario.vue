<template>
  <div>
    <span>{{nome}}</span>
  </div>
</template>

<script>
export default {
  name: "NomeUsuario",
  props: {
    nome: {
      type: String,
    },
  },
};
</script>