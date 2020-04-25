import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    listItem:{},
  },
  getters:{
    listItem:state => {
      return state.listItem
    }
  },
  mutations:{
    GET_LISTITEM(state, response){
      state.listItem = response.data.d
    },
  },
  actions:{
    GET_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      return axios.get(`web/Lists(guid'${rootGetters.listGuid}')/items(${rootGetters.id})`)
      .then(response => {
        commit('GET_LISTITEM', response)
      })
      .then(() =>{
        commit('SET_FORM_ACTION', 'resting')
      })
      .catch(error => {
        commit('SET_ERROR', error.response)
        commit('SET_FORM_ACTION', 'errored')
      })
      .finally(() =>{
      })
    },
    CREATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_FORM_ACTION', 'saving')
      let headers = {
        'Accept':'application/json;odata=verbose',
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": rootGetters.formDigestValue
      }
      let data = JSON.stringify({
        "__metadata": {"type": rootGetters.entityType }, 
        "Title": getters.listItem.Title
      })
      axios.post(`web/Lists(guid'${rootGetters.listGuid}')/items`,data, {headers:headers})
      .then(response => {
        setTimeout(() => { 
          commit('SET_FORM_ACTION', 'saved')
        }, process.env.VUE_APP_ASYNC_LAG);
      })
      .catch(error => {
        commit('SET_ERROR', error.response)
        setTimeout(() => {
          commit('SET_FORM_ACTION', 'errored')
        }, process.env.VUE_APP_ASYNC_LAG);

      })
      .finally(() =>{
      })
    },
    UPDATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_FORM_ACTION', 'saving')
      let headers = {
        'Accept':'application/json;odata=verbose',
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": rootGetters.formDigestValue,
        "X-HTTP-Method": "MERGE", // <-- for update request
        "IF-MATCH": "*" // <-- for update request
      }
      let data = JSON.stringify({
        "__metadata": {"type": rootGetters.entityType }, 
        "Title": getters.listItem.Title
      })

      // Because... IE9 (status code for update is 1223, not... whatever it's actually supposed to be (304?)
      let validateStatus = function(status){
        return status === 1223 || status < 400
      }

      axios.post(`web/Lists(guid'${rootGetters.listGuid}')/items(${rootGetters.id})`,data, {headers:headers, validateStatus:validateStatus})
      .then(response => {
        setTimeout(() => { 
          commit('SET_FORM_ACTION', 'saved')
        }, process.env.VUE_APP_ASYNC_LAG);
      })
      .catch(error => {
        commit('SET_ERROR', error.response)
        setTimeout(() => {
          commit('SET_FORM_ACTION', 'errored')
        }, process.env.VUE_APP_ASYNC_LAG);
      })
      .finally(() =>{

      })
    },
  }
}