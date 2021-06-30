import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin.vue")
  },
  {
    path: "/admin/produtos/add",
    name: "addProduto",
    component: () => import("@/views/produtos/AddProduto.vue")
  },
  {
    path: "/admin/produtos/:produtoId",
    name: "editProduto",
    component: () => import("@/views/produtos/EditProduto.vue")
  },
  {
    path: "/admin/produtos",
    name: "listProdutos",
    component: () => import("@/views/produtos/ListProdutos.vue")
  },
  {
    path: "/admin/users",
    name: "listUsers",
    component: () => import("@/views/users/ListUsers.vue")
  },
  {
    path: "/admin/users/add",
    name: "addUser",
    component: () => import("@/views/users/AddUser.vue")
  },
  {
    path: "/admin/users/:userId",
    name: "editUser",
    component: () => import("@/views/users/EditUser.vue")
  },
  {
    path: "/admin/encomendas",
    name: "listEncomendas",
    component: () => import("@/views/encomendas/ListEncomendas.vue")
  },
  {
    path: "/admin/encomendas/:encomendaId",
    name: "editEncomenda",
    component: () => import("@/views/encomendas/EditEncomenda.vue")
  },
  {
    path: "/admin/encomendas/add",
    name: "addEncomenda",
    component: () => import("@/views/encomendas/AddEncomenda.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: () => import("@/views/EditProfile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/newencomenda",
    name: "newencomenda",
    component: () => import("@/views/encomendas/NewEncomenda.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/produtos",
    name: "produtos",
    component: () => import("@/views/Produtos.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/produtos/:produtoId",
    name: "produto",
    component: () => import("@/views/Produto.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/encomendas",
    name: "encomendas",
    component: () => import("@/views/Encomendas.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/encomendas/:encomendaId",
    name: "encomenda",
    component: () => import("@/views/Encomenda.vue"),
    meta: {
      rule: "user"
    }
  },
  // Redirect to 404 page, if no match found
  {
    path: "*",
    component: () => import("@/views/Error404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
