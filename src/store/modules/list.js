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
    editFormUrl(state){
      return window.location.href.replace(state.defaultForms.display, state.defaultForms.edit)
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
      return axios.get(`web/Lists(guid'${rootGetters.listGuid}')?$select=Title,DefaultDisplayFormUrl,DefaultEditFormUrl,DefaultNewFormUrl,EffectiveBasePermissions,ListItemEntityTypeFullName`)
      .then(response => {
        commit('GET_LIST_META', response)
      })
      .then(() => {
         if(rootGetters.id > 0 && ['edit','display'].includes(getters.currentForm)){
          setTimeout(() => { 
            dispatch('GET_LISTITEM_ASYNC')
          }, 1000);
        }
        else{
          commit('SET_FORM_ACTION', 'resting')
        }       
      })
      .catch(error => {
        commit('SET_ERROR', error.response)
        commit('SET_FORM_ACTION', 'errored')
      })
      .finally(() =>{

      })
    }
  }
}