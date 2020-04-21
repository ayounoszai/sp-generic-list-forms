<template>
  <el-container>
    <el-main>
      <p>Edit Form {{listItem.Title}}</p>
    </el-main>
  </el-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name:'EditForm',
  data(){
    return{

    }
  },
  watch:{
    ...mapGetters(['listItem'])
  }
}
</script>