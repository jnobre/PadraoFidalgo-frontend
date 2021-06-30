<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="'Encomenda nº' + encomenda._id" />
        <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
          <div class="form-group">
            <input
              v-model="encomenda.referencia"
              type="text"
              class="form-control form-control-lg"
              id="txtReferencia"
              placeholder="Referência"
              disabled
            />
          </div>
          <div class="form-group">
            <input
              v-model="encomenda.quantidade"
              type="text"
              class="form-control form-control-lg"
              id="txtQuantidade"
              placeholder="Quantidade"
              disabled
            />
          </div>
          <div class="form-group">
            <input
              v-model="encomenda.cliente"
              type="text"
              class="form-control form-control-lg"
              id="txtCliente"
              placeholder="Nome do Cliente"
              disabled
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
              disabled
            />
          </div>
          <div class="form-group">
            <input
              v-model="encomenda.estado"
              type="text"
              onmouseenter="(this.type='date')"
              onmouseleave="(this.type='text')"
              class="form-control form-control-lg"
              id="txtEstado"
              placeholder="Estado"
              disabled
            />
          </div>
          <div class="form-group">
            <textarea
              id="txtComentarios"
              class="form-control form-control-lg"
              placeholder="Escreva o seu comentário"
              cols="30"
              rows="10"
              v-model="comentario"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                <i class="fas fa-edit"></i> Inserir Comentário
              </button>
          <router-link
                :to="{name: 'encomendas'}"
                tag="button"
                class="btn btn-outline-danger btn-lg"
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
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import { EDIT_ENCOMENDA } from "@/store/encomendas/encomenda.constants";
import router from "@/router";

export default {
  name: "Encomenda",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      encomenda: "",
      comentario: "",
      comentarios: []
    };
  },
  computed: {
    ...mapGetters("auth", ["getProfile"]),
    ...mapGetters("user", ["getUsersById"]),
    ...mapGetters("encomenda", ["getEncomendasById"])
  },
  methods: {
    update(){
      if(this.comentario !== "") {
        this.encomenda.comentarios.push({
          comentario: this.comentario,
          user: this.getProfile._id,
          date: this.getCurrentDateTime()
        });
      }
      this.$store
        .dispatch(`encomenda/${EDIT_ENCOMENDA}`, this.$data.encomenda)
        .then(
          () => {
            this.$alert(this.getMessage, "Comentário inserido!","success");
            router.push({name: 'encomendas'});
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
    }
  },
  created() {
    this.encomenda = this.getEncomendasById(this.$route.params.encomendaId);
  }
};
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
