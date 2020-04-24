<template>
  <el-container>
    <el-main>
      <el-form  ref="thisForm" label-width="120px" v-loading="isInitializing" element-loading-text="" element-loading-spinner='none' element-loading-custom-class='isWorking'>
        <!-- Title -->
         <el-form-item label="Title">
          <el-input v-model="listItem.Title" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-main>

    <!-- Buttons -->
    <el-main class="sp-vue-body sp-vue-body-buttons">
      <!-- <el-button type="primary" @click="validateData" :disabled="isWorking">Save</el-button> -->
      <el-button @click="cancel">Cancel</el-button>
    </el-main>    
  </el-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
  name:'DisplayForm',
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['listItem','isInitializing'])
  },
  methods:{
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>