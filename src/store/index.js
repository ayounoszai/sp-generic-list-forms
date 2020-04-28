import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import listItem from './modules/listItem'
import error from './modules/error'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formDigestValue:'',
    formAction:'initializing'
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
    formAction(state){
      return state.formAction
    },
    formDigestValue(state){
      return state.formDigestValue
    },
    listGuid(state){
      return _spPageContextInfo.pageListId.replace("{","").replace("}","")
    }
  },
  mutations: {
    SET_FORM_ACTION(state, action){
      // initializing - when it the form is getting the data and populating fields
      // resting - after the form has been initialized and is waiting for the user to do something
      // saving - user has clicked on the save button and we're doing work
      // saved - if the work completed successfully
      // errored - if there was an error at any point (either during initializing or saving)
      state.formAction = action
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
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  modules: {
    list, listItem, error
  }
})
