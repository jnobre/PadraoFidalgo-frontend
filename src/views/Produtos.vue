<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Produtos" />

      <!-- Portfolio Grid Items -->
      <b-row>
        <!--FILTRO-->

        <div class="form-group  mx-sm-3  mb-5">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Procura pelo nome..."
            v-model="filterName"
          />
        </div>

        <div class="form-group mb-5">
          <button class="btn btn-success btn-lg" @click="sortProdutos">
            <i :class="classSorter"></i> ordenar
          </button>
        </div>
      </b-row>
      <div class="row">
        <Produto v-for="a in filteredProdutos" :key="a.id" :produto="a"></Produto>
      </div>
    </b-container>
  </section>
</template>

<script>
import Produto from "@/components/Produto.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_PRODUTOS } from "@/store/produtos/produto.constants";

import { mapGetters } from "vuex";

export default {
  name: "Produtos",
  components: {
    HeaderPage,
    Produto
  },
  data: function() {
    return {
      filterName: "",
      filterGroup: "todos",
      filterLevel: "todos",
      reverse: false,
      produtos: [],
      userLevel:0
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters('auth', ["getProfile"]),
    ...mapGetters("produto", ["getProdutos","getMessage"]),
    classSorter() {
      return {
        "fas fa-sort-alpha-up": !this.reverse,
        "fas fa-sort-alpha-down": this.reverse
      };
    },
    filteredProdutos() {
      return this.produtos.filter(produto => {
        let filterNameResult = true;
        if (this.filterName != "") {
          filterNameResult = produto.designacao.toUpperCase().includes(this.filterName.toUpperCase());
        }
        return filterNameResult && produto.stock > 0;
      });
    }
  },
  methods: {
    compareProdutoDesignacao(produto1, produto2) {
      if (!this.reverse) {
        if (produto1.designacao > produto2.designacao) return 1;
        if (produto1.designacao < produto2.designacao) return -1;
      } else {
        if (produto1.designacao < produto2.designacao) return 1;
        if (produto1.designacao > produto2.designacao) return -1;
      }
      return 0;
    },
    sortProdutos() {
      this.produtos.sort(this.compareProdutoDesignacao);
      this.reverse = !this.reverse;
    }
  },
  created() {
    this.$store
      .dispatch(`produto/${FETCH_PRODUTOS}`)
      .then(
        () => {
          this.produtos = this.getProdutos;
        },
        err => this.$alert(`${err.message}`, "Erro", "error")
      );
  }
};
</script>
