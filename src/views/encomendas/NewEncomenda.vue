<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Nova Encomenda" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="encomenda.referencia"
                type="text"
                class="form-control form-control-lg"
                id="txtReferencia"
                placeholder="Referência"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="encomenda.quantidade"
                type="text"
                class="form-control form-control-lg"
                id="txtQuantidade"
                placeholder="Quantidade"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="encomenda.cliente"
                type="text"
                class="form-control form-control-lg"
                id="txtCliente"
                placeholder="Nome do Cliente"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="encomenda.data_entrega"
                type="text"
                onmouseenter="(this.type='date')"
                onmouseleave="(this.type='text')"
                class="form-control form-control-lg"
                id="txtDataEntrega"
                placeholder="Data de entrega"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtComentarios"
                class="form-control form-control-lg"
                placeholder="Comentários"
                cols="30"
                rows="10"
                v-model="comentario"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'produtos'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i>  CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_ENCOMENDA } from "@/store/encomendas/encomenda.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "NewEncomenda",
  components: {
    HeaderPage
  },
  data: function() {
    return{
        encomenda: {
          referencia: "",
          quantidade: "1",
          estado: "PENDENTE",
          data_entrega: "",
          cliente: "",
          comentarios: []
        },
        comentario: ""
    }
  },
  computed: {
    ...mapGetters("encomenda", ["getMessage"]),
    ...mapGetters("produto", ["getProdutoById", "getMessage"]),
    ...mapGetters("auth", ["getProfile"])
  },
  methods: {
    add() {
      if(this.comentario !== "") {
        this.encomenda.comentarios.push({
          comentario: this.comentario,
          user: this.getProfile._id,
          date: this.getCurrentDateTime()
        });
      }
      this.$store.dispatch(`encomenda/${ADD_ENCOMENDA}`, this.encomenda).then(
        () => {
          this.$alert(this.getMessage, "Encomenda adicionada!", "success");
          router.push({ name: "produtos" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    getCurrentDateTime() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDay();
      const time = today.getHours() + ":" + today.getMinutes();
      return `${date} ${time}`;
    },
  },
  created() {
    let produto = this.getProdutoById(this.$route.params.produtoId);
    this.encomenda.referencia = produto.referencia;
    this.encomenda.cliente = this.getProfile.name;
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
