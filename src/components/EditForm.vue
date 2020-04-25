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
      <el-button type="primary" @click="validateData" :disabled="isSaving">Save</el-button>
      <el-button @click="cancel" :disabled="isSaving === true && isListItemSaved !== false">Cancel</el-button>
    </el-main>
    
    <!-- Error -->
    <el-main v-if="isListItemSaved === false">
      <el-alert type="error" effect="dark" show-icon :closable="false">
        <p class='error-summary'>We had an issue with saving the item</p>
      </el-alert>
      <el-card class="error-message">
        <p class="error-summary">The server returned the following message:</p>
        <blockquote>{{listItemError.data.error.message.value}}</blockquote>
        <el-link @click="showErrorMessage = !showErrorMessage" type="primary">Click here to view the raw error message</el-link>
        <p v-if="showErrorMessage">{{listItemError}}</p>
      </el-card>
    </el-main>  

  </el-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name:'NewForm',
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
    ...mapGetters(['listItem','isSaving','isListItemSaved','listItemError'])
  },
  watch:{
    isListItemSaved:function(){
      if(this.isListItemSaved === true){
        window.location.href = decodeURIComponent(this.$store.getters.source)
      }
      else{
        this.$notify.error({title: 'There was an error saving the item', message:"Please see below for more details on what happened."});
      }
    },
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
      this.$store.dispatch('UPDATE_LISTITEM_ASYNC')
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>