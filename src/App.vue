<template>
  <div id="app">
    <div v-if='isWorking'>
      <p >Is Working</p>
      <div class='working'/>
    </div>
    <new-form v-if="currentForm === 'new'"/>
    <edit-form v-if="currentForm === 'edit'"/>
    <display-form v-if="currentForm === 'display'"/>
    <unknown-form v-if="currentForm === 'unknown'"/>
    
    
    <div v-if="currentForm === 'loading'">
      <!-- <img src='/_layouts/15/images/gears_anv4.gif' alt="loading"/> -->
    </div>
  </div>
</template>

<script>
import store from './store'
import {mapState, mapGetters, mapActions} from 'vuex'
import NewForm from './components/NewForm.vue'
import EditForm from './components/EditForm.vue'
import DisplayForm from './components/DisplayForm.vue'
import UnknownForm from './components/UnknownForm.vue'

export default {
  name: 'app',
  components: {
    NewForm, EditForm, DisplayForm, UnknownForm
  },
  mounted(){
    store.dispatch('GET_LIST_META_ASYNC')
    store.dispatch('GET_FORMDIGESTVALUE')
  },
  computed:{
    ...mapGetters(['currentForm','source','id', 'isWorking'])
  },
  watch:{
    currentForm:function(){
      if(this.id > 0 && ['edit','display'].includes(this.currentForm)){
        store.dispatch('GET_LISTITEM_ASYNC')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}


section.el-container{
  display:inline-block;
  width:750px;
}


.sp-vue-body{
  border: 0px hidden #d8d8d8;
  padding: 8px;
  vertical-align: top;
  text-align: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #000000;
  display: inline;
  font-size: 12pt;
  text-align: left;
}
.sp-vue-body-buttons{
  display:block;
  text-align:right;
  padding-right:20px;
}
</style>
