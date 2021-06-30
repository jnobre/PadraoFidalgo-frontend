<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Produto"/>
      
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="designacao"
                type="text"
                class="form-control"
                id="txtDesignacao"
                placeholder="Designação"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="referencia"
                type="text"
                class="form-control"
                id="txtReferencia"
                placeholder="Referencia"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="resumo"
                type="text"
                class="form-control"
                id="txtResumo"
                placeholder="Resumo"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="precosiva"
                type="text"
                class="form-control"
                id="txtPrecosiva"
                placeholder="Preço s/ iva"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="iva"
                type="text"
                class="form-control"
                id="txtIva"
                placeholder="Iva"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="precociva"
                type="text"
                class="form-control"
                id="txtPrecociva"
                placeholder="Preço c/ iva"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="stock"
                type="text"
                class="form-control"
                id="txtStock"
                placeholder="Stock"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="unidade"
                type="text"
                class="form-control"
                id="txtUnidade"
                placeholder="Unidade"
                required
              />
            </div>         
            <!--<pre>{{ $data }}</pre>-->
            <button type="submit" class="btn btn-outline-success mr-2"><i class="fas fa-save"></i> GRAVAR PRODUTO</button>
            <router-link
              :to="{name: 'listProdutos'}"
              tag="button"
              class="btn btn-outline-danger"
            ><i class="fas fa-window-close"></i> CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_PRODUTO } from "@/store/produtos/produto.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";

import { mapGetters } from "vuex";

export default {
  name: "AddProduto",
   components: {
    HeaderPage
  },
  data: () => {
    return {
      designacao: "",
      referencia: "",
      resumo: "",
      precosiva: "",
      iva: "",
      precociva: "",
      stock: "",
      unidade: ""
    };
  },
  computed: {
    ...mapGetters("produto", ["getMessage"])
  },
  methods: {
    add() {
      this.$store
        .dispatch(`produto/${ADD_PRODUTO}`, {
          designacao: this.designacao,
          referencia: this.referencia,
          resumo: this.resumo,
          precosiva: this.precosiva,
          iva: this.iva,
          precociva: this.precociva,
          stock: this.stock,
          unidade: this.unidade
        })
        .then(
          () => {
            this.$alert(this.getMessage, "Produto adicionado!", "success");
            router.push({name: 'listProdutos'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  }
};
</script>