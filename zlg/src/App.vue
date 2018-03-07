<template>
  <div id="app" class="app-main">
    <router-view></router-view>
    <div class="tab border" v-if="identity === '使用人'">
      <div class="tab-item" :class='{routera: active === "1"}' @click='active = "1"'>
        <router-link to="/lend" ><i class='iconfont icon-homepage_fill'></i><br/>借工具</router-link>
      </div>
      <div class="tab-item" :class='{routera: active === "2"}' @click='active = "2"'>
        <router-link to="/return"> <i class='iconfont icon-homepage_fill' ></i><br/>还工具</router-link>
      </div>
      <div class="tab-item" :class='{routera: active === "3"}' @click='active = "3"'>
        <router-link to="/my"> <i class='iconfont icon-homepage_fill' ></i><br/>个人中心</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        active: '1'
      }
    },
    computed: {
      ...mapGetters([
        'identity'
      ])
    }
  }
</script>

<style lang="less">
  @import "./styles/main.less";
  .tab {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    height: 60px;
    width: 100%;
    z-index: 20;
    border-top: 1px solid #ccc;
    background: rgba(238, 238, 238, 0.5);
    .tab-item {
      flex: 1;
      text-align: center;
      i {
        font-size: 24px;
        color: white;
      }
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        background: rgb(40,55,68);
        color: white;
        text-decoration: none !important;
      }
    }
    .routera{
      a{
        color: #2db7f5;
        i{
          color: #2db7f5;
        }
      }
    }
  }
</style>
