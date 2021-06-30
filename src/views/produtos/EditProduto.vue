<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Produto" />
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="produto.designacao"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Designação"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.resumo"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Resumo"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.precociva"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Preço s/ iva"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.iva"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="IVA"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.precosiva"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Preço c/ iva"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.stock"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Stock"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="produto.unidade"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Unidade"
                required
              />
            </div>
           
            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listProdutos'}"
              tag="button"
              class="btn btn-outline-danger"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_PRODUTO } from "@/store/produtos/produto.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
  name: "EditProduto",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      produto: {}
    };
  },
  computed: {
    ...mapGetters("produto", ["getProdutoById", "getMessage"])
  },
  methods: {
    update() {
      this.$store
        .dispatch(`produto/${EDIT_PRODUTO}`, this.$data.produto)
        .then(
          () => {
            this.$alert(this.getMessage, "Produto atualizado!","success");
            router.push({name: 'listProdutos'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.produto = this.getProdutoById(this.$route.params.produtoId);
    let x = setInterval(function() {
      this.seconds -= 1;
      if (this.seconds < 0) {
        clearInterval(x);
        this.seconds = "EXPIRED";
      }
    }, 1000);
  }
};
</script>
