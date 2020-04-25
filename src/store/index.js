import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import listItem from './modules/listItem'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isInitializing:true,
    isSaving:false,
    formDigestValue:'',
  },
  getters:{
    source(state){
      let href =  window.location.href.toLowerCase();
      let reg = new RegExp( '[?&]source=([^&#]*)', 'i' );
      let string = reg.exec(href);
      return string ? decodeURIComponent(string[1]) : _spPageContextInfo.listUrl;
    },
    id(state){
      let href =  window.location.href.toLowerCase();
      let reg = new RegExp( '[?&]id=([^&#]*)', 'i' );
      let string = reg.exec(href);
      return string ? Number(string[1]) : 0;
    },
    isInitializing(state){
      return state.isInitializing
    },
    isSaving(state){
      return state.isSaving
    },
    formDigestValue(state){
      return state.formDigestValue
    },
    listGuid(state){
      return _spPageContextInfo.pageListId.replace("{","").replace("}","")
    }
  },
  mutations: {
    SET_IS_INITIALIZING(state, isInitializing){
      state.isInitializing = isInitializing
    },
    SET_IS_SAVING(state, isSaving){
      state.isSaving = isSaving
    },
    SET_FORMDIGESTVALUE(state, response){
      state.formDigestValue = response.data.d.GetContextWebInformation.FormDigestValue
    }
  },
  actions: {
    GET_FORMDIGESTVALUE({dispatch, commit, getters, rootGetters}){
      axios.post(`contextinfo`,null,{headers:{'Accept':'application/json;odata=verbose'}})
      .then(response =>{
        commit('SET_FORMDIGESTVALUE', response)
      })
    }
  },
  modules: {
    list, listItem
  }
})
