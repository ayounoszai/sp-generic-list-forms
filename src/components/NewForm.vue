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
      <el-button @click="cancel" :disabled="isSaving">Cancel</el-button>
    </el-main>    
  </el-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name:'NewForm',
  data(){
    return{
      formRules:{
        Title:[
          {required: true, message: 'Please enter a title', trigger: 'blur'},
          {max:255,message:'Title can only be 255 characters', trigger:'blur'}
        ],
      }
    }
  },
  computed:{
    ...mapGetters(['listItem','isSaving','isListItemSaved'])
  },
  watch:{
    isListItemSaved:function(){
      if(this.isListItemSaved === true){
        window.location.href = decodeURIComponent(this.$store.getters.source)
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
      this.$notify.info({title: 'Saving...', duration:2000});
      this.$store.dispatch('CREATE_LISTITEM_ASYNC')
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>