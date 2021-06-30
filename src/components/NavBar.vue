<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-5">
        <router-link
          :to="{ name: 'home' }"
          tag="img"
          :src="require('@/assets/padraofidalgo_line.png')"
          style="width:250px; height:50px"
          title="Padrão Fidalgo"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">
          <b-nav-item :to="{ name: 'produtos' }" :disabled="!isUserLoggedIn">PRODUTOS</b-nav-item
          >
          <b-nav-item :to="{ name: 'encomendas' }" :disabled="!isUserLoggedIn"
            >ENCOMENDAS</b-nav-item
          >
          <b-nav-item :to="{name: 'home'}">CONTACTOS</b-nav-item>
          <div v-if="getUserType === 'admin'">
              <b-nav-item :to="{ name: 'admin' }">ADMIN</b-nav-item>
          </div>
          <div v-if="isUserLoggedIn">
            <b-nav-item :to="{ name: 'profile' }">
              <img
                class="avatar"
                :src="
                  require(`@/assets/avatars/profile-128.png`)
                "
                :title="getProfileName"
              />
              </b-nav-item>

            
          </div>
          <div v-else>
            <b-nav-item :to="{ name: 'login' }">LOGIN</b-nav-item>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getProfileName",
      "getUserType",
      "getProfile"
    ])
  }
};
</script>
