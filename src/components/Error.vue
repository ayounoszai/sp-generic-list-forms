<template>
      <!-- Error -->
    <el-main>
      <el-alert type="error" effect="dark" show-icon :closable="false">
        <p class='error-summary'>We've run into an issue...</p>
      </el-alert>
      <el-card class="error-message">
        <p class="error-summary">The server returned the following message:</p>
        <blockquote>{{error.data.error.message.value}}</blockquote>
        <el-link @click="isErrorJsonVisible = !isErrorJsonVisible" type="primary">Click here to view the raw error message</el-link>
        <p v-if="isErrorJsonVisible">{{error}}</p>
      </el-card>
    </el-main>  
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name:'Error',
  data(){
    return{
      isErrorJsonVisible:false
    }
  },
    computed:{
    ...mapGetters(['error'])
  },
}
</script>

<style scoped>
.error-summary{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-size:16px;
}
.error-message{
  text-align: left;
}
</style>