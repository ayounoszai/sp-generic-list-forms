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
      <el-button @click="edit" type="primary" :disabled="formAction !== 'resting'">Edit</el-button>
      <el-button @click="cancel" :disabled="!['resting','errored'].includes(formAction)">Cancel</el-button>
    </el-main>    

    <!-- Error -->
    <Error v-if="formAction === 'errored'"></Error>

  </el-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Error from './Error.vue'

export default {
  name:'DisplayForm',
  components:{
    Error
  },
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['listItem','formAction','editFormUrl'])
  },
  methods:{
    edit(){
      window.location.href = decodeURIComponent(this.$store.getters.editFormUrl);
    },
    cancel(){
      window.location.href = decodeURIComponent(this.$store.getters.source);
    }
  }
}
</script>