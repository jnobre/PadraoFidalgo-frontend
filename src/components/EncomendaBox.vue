<template>
  <b-col cols="3">
    <b-card bg-variant="secondary" text-variant="white" class="text-center mb-3">
        <h1 style="color: white">{{index}}</h1>
        <h6>{{title}}</h6>
        <div>          
          <i class="fas fa-newspaper fa-3x" style="color: green" @click="openEncomenda()"></i>
        </div>
    </b-card>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AdminOptionBox",
  props: ["idEncomenda", "index", "title"],
  computed: {
    ...mapGetters({ user: "auth/getProfile" })
  },
  methods: {
    openEncomenda() {
      router.push({ name: "encomenda", params: { encomendaId: this.idEncomenda } });
    }
  }
};
</script>
