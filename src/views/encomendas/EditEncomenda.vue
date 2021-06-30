<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Encomenda" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <select id="sltEstado" class="form-control form-control-lg" v-model="encomenda.estado">
                <option value>-- Seleciona o Estado --</option>
                <option value="PENDENTE">Pendente</option>
                <option value="VALIDADA">Validada</option>
                <option value="EM CURSO">Em curso</option>
                <option value="ENTREGUE">Entregue</option>
                <option value="FINALIZADA">Finalizada</option>
              </select>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listEncomendas'}"
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
import { EDIT_ENCOMENDA } from "@/store/encomendas/encomenda.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditEncomenda",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      encomenda: {}
    };
  },
  computed: {
    ...mapGetters("encomenda", ["getEncomendasById", "getMessage"])
  },
  methods: {
    removeComments() {
      this.encomenda.comentarios.length = 0
      this.$alert("Comentários removidos, clique em atualizar!", "Comentários!", "success");
    },
    update() {
      this.$store.dispatch(`encomenda/${EDIT_ENCOMENDA}`, this.$data.encomenda).then(
        () => {
          this.$alert(this.getMessage, "Encomenda atualizado!", "success");
          router.push({ name: "listEncomendas" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    formatDate: d => 
    {
      const newDate = new Date(Date.parse(d))
      return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()
    }
  },
  created() {
    this.encomenda = this.getEncomendasById(this.$route.params.encomendaId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>