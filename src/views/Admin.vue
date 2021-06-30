<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Gestão da Padrão Fidalgo"/>

      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <b-card-group deck>
            <AdminOptionBox routeName="listUsers" iconName="users" title="Utilizadores"/>
            <AdminOptionBox routeName="listEncomendas" iconName="check"  title="Encomendas"/>
          </b-card-group>
          <b-card-group deck class="mt-3">
            <AdminOptionBox routeName="listProdutos" iconName="box"  title="Produtos"/>
            <AdminOptionBox routeName="admin" iconName="question-circle"  title="Estatisticas"/>
          </b-card-group>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  }
};
</script>