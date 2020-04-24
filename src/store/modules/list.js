import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    title:'',
    defaultForms:{
      new:'',
      edit:'',
      display:''
    },
    effectiveBasePermissions:{
      high:-1,
      low:-1,
    },
    entityType:''
  },
  getters:{
    currentForm(state){
      if(state.defaultForms.new === ''){
        return "display"
      }
      let cur = _spPageContextInfo.serverRequestPath.toLowerCase().replace("_dev","").replace("_","")
      if(cur === state.defaultForms.new.toLowerCase()){
        return 'new'
      }
      else if(cur === state.defaultForms.edit.toLowerCase()){
        return 'edit'
      }
      else if(cur === state.defaultForms.display.toLowerCase()){
        return 'display'
      }
      return "unknown"
    },
    entityType(state){
      return state.entityType
    }
  },
  mutations: {
    GET_LIST_META(state, response){
      state.defaultForms.new = response.data.d.DefaultNewFormUrl
      state.defaultForms.edit = response.data.d.DefaultEditFormUrl
      state.defaultForms.display = response.data.d.DefaultDisplayFormUrl
      state.title = response.data.d.Title
      state.effectiveBasePermissions.high = Number(response.data.d.EffectiveBasePermissions.High)
      state.effectiveBasePermissions.low = Number(response.data.d.EffectiveBasePermissions.Low)
      state.entityType = response.data.d.ListItemEntityTypeFullName
    },
  },
  actions: {
    GET_LIST_META_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_INITIALIZING', true)
      return axios.get(`web/Lists(guid'${rootGetters.listGuid}')?$select=Title,DefaultDisplayFormUrl,DefaultEditFormUrl,DefaultNewFormUrl,EffectiveBasePermissions,ListItemEntityTypeFullName`)
      .then(response => {
        commit('GET_LIST_META', response)
      })
      .catch(err => {

      })
      .finally(() =>{
        if(rootGetters.id > 0 && ['edit','display'].includes(getters.currentForm)){
          // dispatch('GET_LISTITEM_ASYNC')
          setTimeout(() => { dispatch('GET_LISTITEM_ASYNC')}, 1000);
        }
        else{
          commit('SET_IS_INITIALIZING', false)
        }
      })
    }
  }
}