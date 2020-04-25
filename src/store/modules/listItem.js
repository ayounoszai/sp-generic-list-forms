import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    listItem:{},
    isListItemSaved:null,
    listItemError:{}
  },
  getters:{
    listItem:state => {
      return state.listItem
    },
    isListItemSaved(state){
      return state.isListItemSaved
    },
    listItemError(state){
      return state.listItemError
    }
  },
  mutations:{
    GET_LISTITEM(state, response){
      state.listItem = response.data.d
    },
    SET_LISTITEM_SAVED(state, isSaved){
      state.isListItemSaved = isSaved
    },
    SET_ERROR(state, error){
      state.listItemError = error
    }
  },
  actions:{
    GET_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      return axios.get(`web/Lists(guid'${rootGetters.listGuid}')/items(${rootGetters.id})`)
      .then(response => {
        commit('GET_LISTITEM', response)
      })
      .catch(err => {

      })
      .finally(() =>{
        commit('SET_IS_INITIALIZING', false)
      })
    },
    CREATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_SAVING', true)
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
        setTimeout(() => { commit("SET_LISTITEM_SAVED",true)}, process.env.VUE_APP_ASYNC_LAG);
      })
      .catch(error => {
        setTimeout(() => {commit("SET_LISTITEM_SAVED", false)}, process.env.VUE_APP_ASYNC_LAG);
        commit('SET_ERROR', error.response)
      })
      .finally(() =>{
      })
    },
    UPDATE_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_SAVING', true)
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
        setTimeout(() => { commit("SET_LISTITEM_SAVED",true)}, process.env.VUE_APP_ASYNC_LAG);
      })
      .catch(error => {
        setTimeout(() => {commit("SET_LISTITEM_SAVED", false)}, process.env.VUE_APP_ASYNC_LAG);
        commit('SET_ERROR', error.response)
      })
      .finally(() =>{

      })
    },
  }
}