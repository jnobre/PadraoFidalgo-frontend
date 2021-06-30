<template>
  <b-col cols="4">
    <b-card
      :title="produto.designacao"
      :img-src="require('@/assets/bovino.jpg')"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-5"
    >
      <b-card-text>
        <kbd>Preço c/ iva</kbd>&nbsp;
        <kbd style="background-color: red">{{ produto.precociva }}</kbd>
      </b-card-text>
      <b-card-text>{{produto.resumo}}</b-card-text>
      <b-card-text align="left">
        <i class="fas fa-barcode fa-lg" :style="{color}" @click="evaluate()"></i>
        &nbsp; <b>Referencia</b>: {{produto.referencia}}
        <i class="fas fa-cubes fa-lg ml-2"></i>
        &nbsp; <b>Stock:</b> {{produto.stock}}
      </b-card-text>
      
      <router-link
        :to="{name: 'newencomenda', params:{produtoId: produto._id}}"
        tag="b-button"
        variant="outline-success"
        align="center"
        class="mr-2"
      >
        <i class="fas fa-shopping-cart"></i> Encomendar
      </router-link>

    </b-card>
  </b-col>
</template>

<script>
import { EDIT_PRODUTO } from "@/store/produtos/produto.constants";
import { mapGetters } from "vuex";

export default {
  name: "Produto",
  props: ["produto"],
  data: function() {
    return {
      color: ""
    };
  },
  methods: {
    ...mapGetters("auth", ["getProfile"]),
    evaluate() {
      if (!this.produto.designacao.includes(this.getProfile()._id)) {
        this.produto.designacao.push(this.getProfile()._id);
        this.color = "red";
      } else {
        this.produto.designacao = this.produto.designacao.filter(
          user => user !== this.getProfile()._id
        );
        this.color = "black";
      }
      this.$store.dispatch(`produto/${EDIT_PRODUTO}`, this.produto).then(
        () => {
          this.$alert(
            `Obrigado por gostares do ${this.protudo.designacao}!`,
            "Gosto",
            "success"
          );
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    if (!this.produto.designacao.includes(this.getProfile()._id)) {
      this.color = "black";
    } else {
      this.color = "red";
    }
  }
};
</script>
