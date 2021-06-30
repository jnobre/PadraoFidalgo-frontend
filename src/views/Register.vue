<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Registo" />

      <!--FORM--><b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <form @submit.prevent="register">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                value="joao nobre"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Nome da empresa"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="nif"
                type="text"
                class="form-control form-control-lg"
                id="txtNif"
                placeholder="NIF"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="location.address"
                type="text"
                class="form-control form-control-lg"
                id="txtcidade"
                placeholder="Morada"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="location.city"
                type="text"
                class="form-control form-control-lg"
                id="txtcidade"
                placeholder="Cidade"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="location.country"
                type="text"
                class="form-control form-control-lg"
                id="txtpais"
                placeholder="País"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="mobile"
                type="number"
                value="joaoanobre@gmail.com"
                class="form-control form-control-lg"
                id="txtContacto"
                placeholder="Contacto telefonico"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="auth.username"
                type="text"
                value="test"
                class="form-control form-control-lg"
                id="txtUsername"
                placeholder="Username"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="auth.email"
                type="text"
                value="joaoanobre@gmail.com"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="auth.password"
                type="password"
                class="form-control form-control-lg"
                id="txtPassword"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                id="txtConfirmPassword"
                placeholder="Confirma a Password"
              />
            </div>
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-file-signature"></i> REGISTAR
            </button>
            <router-link
              :to="{ name: 'login' }"
              tag="button"
              class="btn btn-danger"
            >
              <i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { AUTH_REGISTER } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "../router";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      location: { city: "", address: "", country: "" },
      auth: { username: "", email: "", password: "" },
      active: true,
      name: "",
      type: "user",
      nif: "",
      mobile: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["getMessage"])
  },
  methods: {
    register() {
      if (
        document.querySelector("#txtPassword").value !==
        document.querySelector("#txtConfirmPassword").value
      ) {
        this.$alert(
          "Campos password não coincidem",
          "Erro de validação do formulário",
          "error"
        );
      } else {
        this.$store
          .dispatch(`auth/${AUTH_REGISTER}`, this.$data)
          .then(() => {
            this.$alert(this.getMessage, "Registo", "success");
            router.push({ name: "home" });
          })
          .catch(err => {
            this.$alert(err.message, "Erro", "error");
          });
      }
    }
  }
};
</script>
