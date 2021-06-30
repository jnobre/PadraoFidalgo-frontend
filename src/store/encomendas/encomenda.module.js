import encomendaService from "@/api/encomenda.service";
import { 
  // Actions
  FETCH_ENCOMENDAS, 
  ADD_ENCOMENDA, 
  EDIT_ENCOMENDA, 
  REMOVE_ENCOMENDA, 
  // Mutations
  SET_ENCOMENDAS, 
  SET_MESSAGE,
  UPDATE_LIKES 
} from "./encomenda.constants";

const state = {
  encomendas: []
};

const getters = {
  getEncomendas: state => state.encomendas,
  getEncomendasById: state => id => state.encomendas.find(encomenda => encomenda._id === id),
  getMessage: state => state.message,
};

const actions = {
  [FETCH_ENCOMENDAS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      encomendaService.getEncomendas(rootState.auth.token)
        .then(
          res => {
            commit(SET_ENCOMENDAS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_ENCOMENDA]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      encomendaService.addEncomenda(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `A encomenda ${res.body.name} foi criada com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_ENCOMENDA]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      encomendaService.editEncomenda(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `A encomenda ${res.body.name} foi atualizada com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_ENCOMENDA]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      encomendaService.removeEncomenda(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `A encomenda foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_ENCOMENDAS]: (state, encomendas) => {
    state.encomendas = encomendas;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  },
  [UPDATE_LIKES]: (state, payload) => {
    state.encomendas.forEach(encomenda => {
      if(encomenda._id === payload.encomendaId) {
        encomenda.evaluation.push(payload.userId)
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}