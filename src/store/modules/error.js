export default {
  // namespaced:true,
  state: {
    error:{}
  },
  getters:{
    error(state){
      return state.error
    }
  },
  mutations: {
    SET_ERROR(state, error){
      state.error = error
    }
  },
  actions: {
  }
}