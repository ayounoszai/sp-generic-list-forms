import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    listItem:{},
  },
  getters:{
    listItem:state => {
      return state.listItem
    },
  },
  mutations:{
    GET_LISTITEM(state, response){
      state.listItem = response.data.d
    },
  },
  actions:{
    GET_LISTITEM_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_WORKING', true)
      return axios.get(`web/Lists(guid'${_spPageContextInfo.pageListId.replace("{","").replace("}","")}')/items(${rootGetters.id})`)
      .then(response => {
        commit('GET_LISTITEM', response)

      })
      .catch(err => {

      })
      .finally(() =>{
        commit('SET_IS_WORKING', false)
        // setTimeout(() => { commit('SET_IS_WORKING', false); console.log('list ITEM finished')}, 2000);
      })
    }
  }
}