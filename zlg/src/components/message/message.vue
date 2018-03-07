<template>
  <div class='message'>
    <div  class='edit'>
      <div class="title">
        <span class='title-name'>库房录入框</span>
        <span class='title-close' @click='showStoreInput'>&times;</span>
      </div>
      <i class="iconfont icon-bianji i"></i>
      <div class="line"></div>
      <div class='box'>
        <storeInput></storeInput>
      </div>
    </div>
  </div>
</template>

<script>
  import storeInput from './storreInput.vue'
  import {mapMutations} from 'vuex'
  export default{
    data () {
      return {
        show: false
      }
    },
    components: {
      storeInput
    },
    methods: {
      ...mapMutations(['SHOW_MESSAGE']),
      showStoreInput () {
        this.show = false
        this.SHOW_MESSAGE(this.show)
      }
    }
  }
</script>
<style lang='less' scoped>
.message{
  width:100%;
  height:100%;
  background-color:white;
  /*filter:alpha(opacity=70);*/
  /*-moz-opacity:0.7;*/
  /*opacity:0.7;*/
  position:fixed;
  left:0px;
  top:0px;
  z-index: 1000;
  .edit{
    position: fixed;
    width: 450px;
    height: 500px;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    box-shadow: 5px 5px 20px grey;

    .title
    {
      color: rgb(50,213,223);
      .title-name{
        height: 50px;
        line-height: 50px;
        position: absolute;
        top: 0;
        margin-left: 5%;
        font-size: 16px;
      }
      .title-close{
        height: 50px;
        line-height: 50px;
        top: 0;
        position: absolute;
        margin-left: 90%;
        font-size: 36px;
      }

    }
    .i{
      position: absolute;
      font-size: 60px;
      left: 50%;
      top: -40px;
      transform: translate(-50%, 0);
      color: rgb(50,213,223);

    }
    .line{
      position: absolute;
      margin-top: 50px;
      height: 2px;
      width: 90%;
      margin-left: 5%;
      background-color: #F4F4F4;
    }
    .box{
      position: absolute;
      /*margin-top: 60px;*/
      margin:60px 50px;

    }
  }
}

</style>
