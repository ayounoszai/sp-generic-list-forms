import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import listItem from './modules/listItem'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isWorking:0,
    formDigestValue:'',
  },
  getters:{
    source(state){
      let href =  window.location.href.toLowerCase();
      let reg = new RegExp( '[?&]source=([^&#]*)', 'i' );
      let string = reg.exec(href);
      return string ? decodeURIComponent(string[1]) : '';
    },
    id(state){
      let href =  window.location.href.toLowerCase();
      let reg = new RegExp( '[?&]id=([^&#]*)', 'i' );
      let string = reg.exec(href);
      return string ? Number(string[1]) : 0;
    },
    isWorking(state){
      return state.isWorking > 0
    },
    formDigestValue(state){
      return state.formDigestValue
    },
    listGuid(state){
      return _spPageContextInfo.pageListId.replace("{","").replace("}","")
    }
  },
  mutations: {
    SET_IS_WORKING(state, isWorking){
      if(isWorking){
        state.isWorking += 1  
      }
      else{
        state.isWorking -= 1
      }

      
      if(state.isWorking < 0){
        state.isWorking = 0
      }
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
