<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Encomendas" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{name:'addEncomenda'}"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR ENCOMENDA
          </router-link>
          <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!--TABLE-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="15">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  REFERÊNCIA
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">QUANTIDADE</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">DATA DE ENTREGA</th>
                <th scope="col">ESTADO</th>
               <!-- <th scope="col">COMENTÁRIOS</th> -->
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="encomenda of encomendas" :key="encomenda._id">
                 <td class="pt-5">{{encomenda.referencia}}</td>
                <td class="pt-5">{{encomenda.quantidade}}</td>
                <td class="pt-5">{{encomenda.cliente}}</td>
                <td class="pt-5">{{formatDate(encomenda.data_entrega)}}</td>
                <td class="pt-5">{{encomenda.estado}}</td>
                <td>
                  <router-link
                    :to="{name:'editEncomenda', params:{encomendaId: encomenda._id}}"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR ESTADO
                  </router-link>
                  <button
                    @click="viewComentarios(encomenda._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER COMENTÁRIOS
                  </button>
                  <button
                    @click="removeEncomenda(encomenda._id)"
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
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_USERS } from "@/store/users/user.constants";
import { FETCH_ENCOMENDAS, REMOVE_ENCOMENDA } from "@/store/encomendas/encomenda.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageEncomendas",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      users: [],
      encomendas: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("encomenda", ["getEncomendas", "getMessage"]),
    ...mapGetters("user", ["getUsers", "getNameById"])
  },
  methods: {
    fetchEncomendas() {
      this.$store.dispatch(`encomenda/${FETCH_ENCOMENDAS}`).then(
        () => {
          this.encomendas = this.getEncomendas;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then( 
        () => {
          this.users = this.getUsers;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    sort() {
      this.encomendas.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    viewComentarios(id) {
      const encomenda = this.encomendas.find(encomenda => encomenda._id === id);
      this.$fire({
        title: encomenda.name,
        html: this.generateTemplate(encomenda),
      });
    },
    generateTemplate(encomenda) {
      let response = `<p><b>Referência: </b>`; 
      response += encomenda.referencia + `</h4>`;
      response += `<p><b>Quantidade: </b>` +encomenda.quantidade+ `</p>`;
      response += `<p><b>Cliente: <b/>`+ encomenda.cliente + `</p>`;
      response += `<p>Comentários:`;
      for (const comentario of encomenda.comentarios) {
        response += ` <p><ul> <li>`;
        response += comentario.comentario + `</li><li> <b>De:</b> `;
        response += this.viewUser(comentario.user) + `</li><li>` + this.formatDate(comentario.date) + `</li> </ul></p>`;
      }
      return response;
    },
    viewUser(userId) 
    {
      return this.getNameById(userId);
    },
    removeEncomenda(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a encomenda?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`encomenda/${REMOVE_ENCOMENDA}`, id).then(() => {
            this.$alert(this.getMessage, "Encomenda removido!", "success");
            this.fetchEncomendas();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
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
    this.fetchEncomendas();
    this.fetchUsers();
  }
};
</script>