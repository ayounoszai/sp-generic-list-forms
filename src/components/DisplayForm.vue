<template>
  <el-container>
    <el-main>
      <el-form  ref="thisForm" label-width="120px">
        <!-- Title -->
        <el-form-item label="Title">
          <el-input v-model="listItem.Title" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-main>

    <!-- Buttons -->
    <el-main class="sp-vue-body sp-vue-body-buttons">
      <el-button @click="edit" type="primary">Edit</el-button>
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
    ...mapGetters(['listItem','isInitializing','editFormUrl'])
  },
  methods:{
    edit(){
      // console.log(this.$store.getters.editFormUrl)
      window.location.href = decodeURIComponent(this.$store.getters.editFormUrl);
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>