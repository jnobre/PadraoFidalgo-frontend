<template>
  <section class="page-section">
    <b-container>
      <b-card class="overflow-hidden mt-5" style="max-width: 1540px; ">
        <b-row>
          <b-col md="6" align="center">
            <b-card-img
              style="width:200px"
              :src="require(`@/assets/avatars/profile-128.png`)"
              class="rounded-0 mb-2"
            ></b-card-img>
            <br />
            <HeaderPage :title="user.name" />
          </b-col>
          <b-col md="6">
            <b-card-body title="PERFIL" align="center">
              <b-card-text align="left">
                <h5>Dados pessoais</h5>
                <strong>Nome: </strong>{{user.name}}
                <br />
                <strong>Email: </strong>{{user.auth.email}}
                <br />
                <strong>NIF:</strong> {{user.nif}}
                <br />
                <strong>Contacto:</strong> {{user.mobile}}
                <br />
                <strong>Cidade:</strong> {{user.location.city}} | <strong>País:</strong> {{user.location.country}}
                <br>
                <strong>Morada:</strong> {{user.location.address}}
                <br />
                <br />
                <h5>Conta</h5>                
                <strong>Data de registo:</strong> {{user.registration_date}}
                <br />
                <strong>Username:</strong> {{user.auth.username}}
                <br />
                <strong>Tipo:</strong> {{user.type==='user'?'Utilizador normal':'Administrador'}}
                <br />
                <br />
                
              </b-card-text>
              <br />
              <b-button variant="outline-success" class="mr-2 mt-2" @click="editProfileData()">
                <i class="fas fa-user-edit"></i> EDITAR PERFIL
              </b-button>
              <b-button variant="outline-danger" class="mr-2 mt-2" @click="logout()">
                <i class="fas fa-sign-out-alt"></i> LOGOUT
              </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </section>
</template>

<script>
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";
export default {
  components: {
    HeaderPage
  },
  data: function() {
    return {
      avatar: {}
    };
  },
  computed: {
    ...mapGetters({ user: "auth/getProfile" })
  },
  methods: {
    logout() {
      this.$confirm(
        "Se sim, clique em OK",
        "Queres mesmo sair do Padrão Fidalgo?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.commit(`auth/${AUTH_LOGOUT_SUCCESS}`);
          router.push({ name: "home" });
        },
        () => {
          this.$alert("Estás de volta!", "Informação", "info");
        }
      );
    },
    setCurrentDateTime(paramDate) {
      const date = new Date(paramDate);
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
    },
    showRanking() {
      router.push({name: 'ranking'})
    },
    editProfileData() {
      router.push({name: 'editProfile'})
    }
  }
};
</script>
