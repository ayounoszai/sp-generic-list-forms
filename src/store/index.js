import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import listItem from './modules/listItem'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isWorking:0
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
  },
  actions: {
    
  },
  modules: {
    list, listItem
  }
})
