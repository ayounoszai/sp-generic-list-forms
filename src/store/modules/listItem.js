import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    listItem:{},
    isListItemSaved:null
  },
  getters:{
    listItem:state => {
      return state.listItem
    },
    isListItemSaved(state){
      return state.isListItemSaved
    }
  },
  mutations:{
    GET_LISTITEM(state, response){
      state.listItem = response.data.d
    },
    SET_LISTITEM_SAVED(state, isSaved){
      state.isListItemSaved = isSaved
    }
  },
  actions:{
    GET_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_INITIALIZING', true)
      return axios.get(`web/Lists(guid'${rootGetters.listGuid}')/items(${rootGetters.id})`)
      .then(response => {
        commit('GET_LISTITEM', response)
      })
      .catch(err => {

      })
      .finally(() =>{
        // commit('SET_IS_INITIALIZING', false)
        setTimeout(() => { commit('SET_IS_INITIALIZING', false); console.log('list ITEM finished')}, 2000);
      })
    },
    CREATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}, payload){
      commit('SET_IS_WORKING', true)
      let headers = {
        'Accept':'application/json;odata=verbose',
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": rootGetters.formDigestValue
      }
      let data = JSON.stringify({
        "__metadata": {"type": rootGetters.entityType }, 
        "Title": payload.title
      })
      axios.post(`web/Lists(guid'${rootGetters.listGuid}')/items`,data, {headers:headers})
      .then(response => {
        commit("SET_LISTITEM_SAVED",true)
      })
      .catch(err => {
        console.log(err)
        commit("SET_LISTITEM_SAVED",false)
      })
      .finally(() =>{
        commit('SET_IS_WORKING', false)
      })
    },
    UPDATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}, payload){
      commit('SET_IS_WORKING', true)
      let headers = {
        'Accept':'application/json;odata=verbose',
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": rootGetters.formDigestValue,
        "X-HTTP-Method": "MERGE", // <-- for update request
        "IF-MATCH": "*" // <-- for update request
      }
      let data = JSON.stringify({
        "__metadata": {"type": rootGetters.entityType }, 
        "Title": payload.title
      })

      // Because... IE9 (status code for update is 1223, not... whatever it's actually supposed to be (304?)
      let validateStatus = function(status){
        return status === 1223 || status < 400
      }

      axios.post(`web/Lists(guid'${rootGetters.listGuid}')/items(${rootGetters.id})`,data, {headers:headers, validateStatus:validateStatus})
      .then(response => {
        commit("SET_LISTITEM_SAVED",true)
      })
      .catch(err => {
        console.log(err)
        commit("SET_LISTITEM_SAVED",false)
      })
      .finally(() =>{
        commit('SET_IS_WORKING', false)
      })
    },
  }
}