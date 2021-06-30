<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Produtos" />
      <!--MENU DE TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{name:'addProduto'}"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PRODUTO
          </router-link>
          <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  Designação
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">Referência</th>
                <th scope="col">Resumo</th>
                <th scope="col">Preço s/ iva</th>
                <th scope="col">IVA</th>
                <th scope="col">Preço c/ iva</th>
                <th scope="col">Stock</th>
                <th scope="col">Unidade</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto of produtos" :key="produto._id">
                <td class="pt-4">{{produto.designacao}}</td>
                <td class="pt-4">{{produto.referencia}}</td>
                <td class="pt-4">{{produto.resumo}}</td>
                <td class="pt-4">{{produto.precosiva}}</td>
                <td class="pt-4">{{produto.iva}}</td>
                <td class="pt-4">{{produto.precociva}}</td>
                <td class="pt-4">{{produto.stock}}</td>
                <td class="pt-4">{{produto.unidade}}</td>
                <td>
                  <router-link
                    :to="{name:'editProduto', params:{produtoId: produto._id}}"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="removeProduto(produto._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_PRODUTOS, REMOVE_PRODUTO } from "@/store/produtos/produto.constants";
import { mapGetters } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue"
export default {
  name: "ListProdutos",
   components: {
    HeaderPage
  },
  data: function() {
    return {
      produtos: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("produto", ["getProdutos","getMessage"])
  },
  methods: {
    fetchProdutos() {
      this.$store.dispatch(`produto/${FETCH_PRODUTOS}`).then( 
        () => {
          this.produtos = this.getProdutos;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    sort() {
      this.produtos.sort(this.compareNames)
      this.sortType *= -1      
    },
    compareNames(q1,q2) {
      if(q1.designacao > q2.designacao) return 1 * this.sortType
      else if(q1.designacao < q2.designacao) return -1 * this.sortType
      else return 0
    },
   /* viewProduto(id) {
      const produto = this.produtos.find(produto => produto._id === id);
      this.$fire({
        title: produto.name,
        html: this.generateTemplate(produto)
      });
    },*/
    generateTemplate(produto) {
      let response = `
          <p><b>Nível</b> ${produto.name}<br>(${produto.nif} pontos)</p>
          <p><b>Lista de questões:</b></p>          
      `          
      /*
                      <td class="pt-4">{{produto.name}}</td>
                <td class="pt-4">{{produto.resumo}}</td>
                <td class="pt-4">{{produto.precosiva}}</td>
                <td class="pt-4">{{produto.iva}}</td>
                <td class="pt-4">{{produto.precociva}}</td>
                <td class="pt-4">{{produto.stock}}</td>
                <td class="pt-4">{{produto.unidade}}</td>
      for (const question of produto.questions) {
       response += `<p>${question.question}</p>`
      }*/
      return response;
    },
    removeProduto(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o produto?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`produto/${REMOVE_PRODUTO}`, id).then(() => {
            this.$alert(
              this.getMessage,
              "Produto removido!",
              "success"
            );
            this.fetchProdutos();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchProdutos();
  }
};
</script>