<template>
  <div id="app" v-loading="formAction === 'initializing'">
    <display-form v-if="currentForm === 'display' || formAction === 'initializing'"/>
    <new-form v-if="currentForm === 'new' && formAction !== 'initializing'"/>
    <edit-form v-if="currentForm === 'edit' && formAction !== 'initializing'"/>
    <unknown-form v-if="currentForm === 'unknown'"/>
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
    ...mapGetters(['currentForm', 'formAction'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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

/* having the specific classes NOT scoped is the only way i can get the text for "disabled" textboxes to be dark enough to read */
.el-input.is-disabled .el-input__inner{
  color:#444 !important
}
</style>
