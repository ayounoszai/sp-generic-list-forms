<template>
  <el-container>
    <el-main>
      <el-form :model='listItem' ref="thisForm" :rules="formRules" label-width="120px">
        <!-- Title -->
        <el-form-item label="Title" prop="Title">
          <el-input v-model="listItem.Title" placeholder="Please enter a title"></el-input>
        </el-form-item>
      </el-form>
    </el-main>

    <!-- Buttons -->
    <el-main class="sp-vue-body sp-vue-body-buttons">
      <el-button type="primary" @click="validateData" :disabled="formAction !== 'resting'">Save</el-button>
      <el-button @click="cancel" :disabled="!['resting','errored'].includes(formAction)">Cancel</el-button>
    </el-main> 

    <!-- Error -->
    <Error v-if="formAction === 'errored'"></Error>
      
  </el-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Error from './Error.vue'

export default {
  name:'NewForm',
  components:{
    Error
  },
  data(){
    return{
      showErrorMessage:false,
      formRules:{
        Title:[
          {required: true, message: 'Please enter a title', trigger: 'blur'},
          {max:255,message:'Title can only be 255 characters', trigger:'blur'}
        ],
      }
    }
  },
  computed:{
    ...mapGetters(['listItem','formAction'])
  },
  watch:{
    formAction:function(){
      if(this.formAction === 'saved'){
        window.location.href = decodeURIComponent(this.$store.getters.source)
      }
      else if(this.formAction === 'errored'){
        this.$notify.error({title: 'There was an error saving the item', message:"Please see below for more details on what happened."});
      }
    }
  },
  methods:{
    validateData(){
      let isValid = false
      this.$refs['thisForm'].validate((valid) => {
        if(!valid){
          this.$notify.error({title: 'Validation errors exist', message: 'Please correct the errors (shown in red) before attempting to save.'});
        }
        else{
          this.save()
        }
      })
    },
    save(){
      this.$notify.info({title: 'Saving...', duration: process.env.VUE_APP_ASYNC_LAG});
      this.$store.dispatch('CREATE_LISTITEM_ASYNC')
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>