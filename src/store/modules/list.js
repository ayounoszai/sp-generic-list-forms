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
    }
  },
  getters:{
    currentForm(state){
      if(state.defaultForms.new === ''){
        return "loading"
      }
      let cur = _spPageContextInfo.serverRequestPath.toLowerCase().replace("dev","").replace("_","")
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
  },
  mutations: {
    GET_LIST_META(state, response){
      state.defaultForms.new = response.data.d.DefaultNewFormUrl
      state.defaultForms.edit = response.data.d.DefaultEditFormUrl
      state.defaultForms.display = response.data.d.DefaultDisplayFormUrl
      state.title = response.data.d.Title
      state.effectiveBasePermissions.high = Number(response.data.d.EffectiveBasePermissions.High)
      state.effectiveBasePermissions.low = Number(response.data.d.EffectiveBasePermissions.Low)
    },
  },
  actions: {
    GET_LIST_META_ASYNC({dispatch, commit, getters, rootGetters}){
      commit('SET_IS_WORKING', true)
      return axios.get(`web/Lists(guid'${_spPageContextInfo.pageListId.replace("{","").replace("}","")}')?$select=Title,DefaultDisplayFormUrl,DefaultEditFormUrl,DefaultNewFormUrl,EffectiveBasePermissions`)
      .then(response => {
        commit('GET_LIST_META', response)
      })
      .catch(err => {

      })
      .finally(() =>{
        // commit('SET_IS_WORKING', false)
        setTimeout(() => { commit('SET_IS_WORKING', false); console.log('list meta finished') }, 4000);
      })
    }
  }
}