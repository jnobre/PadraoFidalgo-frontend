import produtoService from "@/api/produto.service";
import { 
  // Actions
  FETCH_PRODUTOS,
  ADD_PRODUTO,
  EDIT_PRODUTO,
  REMOVE_PRODUTO,
  // Mutations 
  SET_PRODUTOS,
  SET_MESSAGE 
} from "./produto.constants";

const state = {
  produtos: [],
  message: ""
};

const getters = {
  getProdutos: state => state.produtos,
  getProdutoById: state => id => {
    return state.produtos.find(produto => produto._id === id)
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_PRODUTOS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      produtoService.getProdutos(rootState.auth.token)
        .then(
          res => {
            commit(SET_PRODUTOS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [ADD_PRODUTO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      produtoService.addProduto(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res.body) 
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [EDIT_PRODUTO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      produtoService.editProduto(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [REMOVE_PRODUTO]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      produtoService.removeProduto(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
      });
    }
  };

export const mutations = {
  [SET_PRODUTOS]: (state, produtos) => {
    state.produtos = produtos;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}