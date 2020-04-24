<template>
  <el-container>
    <el-main>
      <el-form :model='formFields' ref="thisForm" :rules="formRules" label-width="120px" v-loading="isWorking" element-loading-text="" element-loading-spinner='none' element-loading-custom-class='isWorking'>
        <!-- Title -->
        <el-form-item label="Title" prop="title">
          <el-input v-model="formFields.title" placeholder="Please enter a title"></el-input>
        </el-form-item>
      </el-form>
    </el-main>

    <!-- Buttons -->
    <el-main class="sp-vue-body sp-vue-body-buttons">
      <el-button type="primary" @click="validateData" :disabled="isWorking">Save</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </el-main>    
  </el-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name:'NewForm',
  data(){
    return{
      formFields:{
        title:''
      },
      formRules:{
        title:[
          {required: true, message: 'Please enter a title', trigger: 'blur'}
        ],
      }
    }
  },
  computed:{
    ...mapGetters(['source','isWorking'])
  },
  methods:{
    validateData(){
      let isValid = false
      this.$refs['thisForm'].validate((valid) => {
        if(!valid){
          console.log("Nope")
        }
        else{
          this.save()
        }
      })
    },
    save(){
      let data = JSON.parse(JSON.stringify(this.formFields))
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }

}
</script>