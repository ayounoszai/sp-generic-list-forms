<template>
  <el-container>
    <el-main>
      <p>Display Form {{listItem.Title}}</p>
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
    ...mapGetters(['listItem','isWorking'])
  }
}
</script>