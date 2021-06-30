<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Lista das suas encomendas" />
      <b-row>
        <EncomendaBox
          v-for="(encomenda, index) in encomendas"
          :key="encomenda._id"
          :idEncomenda="encomenda._id"
          :index="index+1"
          :title="encomenda.referencia"
          :estado="encomenda.estado"
          :dataEntrega="encomenda.data_entrega"
        />
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { FETCH_ENCOMENDAS } from "@/store/encomendas/encomenda.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import EncomendaBox from "@/components/EncomendaBox.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    HeaderPage,
    EncomendaBox
  },
   data: function() {
    return {
      encomendas: [],
      user: ""
    };
  },
  computed: {
    ...mapGetters("encomenda", ["getEncomendas"]),
    ...mapGetters("auth", ["getProfile"])
  },
  methods: {
    fetchEncomendas() {
      this.$store
      .dispatch(`encomenda/${FETCH_ENCOMENDAS}`)
      .then(
        () => { 
          this.encomendas = this.getEncomendas.filter(encomenda => encomenda.cliente === this.user.name)
          this.encomendas.sort(this.compareDataEntrega)
        },
        err => this.$alert(`${err.message}`, "Erro", "error")
      );
    },
    compareDataEntrega(q1, q2) {
        if (q1.data_entrega > q2.data_entrega) return 1;
        if (q1.data_entrega < q2.data_entrega) return -1;
        else return 0;
    }
  },
  created() {
    this.fetchEncomendas()
    this.user = this.getProfile;
  }
};
</script>