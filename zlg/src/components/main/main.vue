<template>
    <div>
      <header class='header18'  v-if='expand'>
        <i  style='font-size: 20px;margin-left: 10px;' class="i iconfont icon-liebiao" @click='expands'></i>
        <span style='position: absolute;right: 5%;'v-show='!userInfo'>{{identity}}</span>
        <span style='position: absolute;right: 10%;' v-show='userInfo'>{{cookidentity}}</span>
        <span style='position: absolute;right: 5%;' @click="exit">退出</span>
      </header>
      <header class='header8' v-else>
        <i  style='font-size: 20px;margin-left: 10px;' class="i iconfont icon-liebiao" @click='expands'></i>
        <span style='position: absolute;right: 5%;'v-show='!userInfo'>{{identity}}</span>
        <span style='position: absolute;right: 10%;' v-show='userInfo'>{{cookidentity}}</span>
        <span style='position: absolute;right: 5%;' @click="exit">退出</span>
      </header>
      <leftBar :routers=routersArray></leftBar>
      <navPath></navPath>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import leftBar from '../leftBar/index.vue'
    import navPath from '../pathTag/index.vue'
    export default{
      data () {
        return {
          expand: true,
          routersArray: [],
          cookidentity: ''
        }
      },
      components: {
        leftBar,
        navPath
      },
      created () {
        if (this.userInfo) {
          switch (this.userInfo.identity) {
            case '1':
              this.cookidentity = '系统管理员'
              this.routersArray = this.$store.state.app.routers
              console.log(this.routersArray)
              break
            case '2':
              alert(this.userInfo.identity)
              this.cookidentity = '库房管理员'
              this.routersArray = this.$store.state.app.stoteRouters
              break
            case '3':
              this.cookidentity = '使用人'
              this.routersArray = this.$store.state.app.routers
              break
          }
        } else {
          switch (this.identity) {
            case '系统管理员':
              this.routersArray = this.$store.state.app.routers
              console.log(this.routersArray)
              break
            case '库房管理员':
              this.routersArray = this.$store.state.app.stoteRouters
              break
            case '使用人':
              this.routersArray = this.$store.state.app.routers
              break
          }
        }
      },
      computed: {
        ...mapGetters([
          'identity',
          'userInfo'
        ])
      },
      methods: {
        ...mapMutations(['SET_LEFTBAR']),
        expands () {
          this.expand = !this.expand
          this.SET_LEFTBAR(this.expand)
        },
        exit () {
          this.$router.push('/login')
        }
      },
      watch: {
        routersArray (val) {
          this.routersArray = val
        }
      }
    }
</script>

<style lang='less' scoped>
  /*.header{*/
    /*position: fixed;*/
    /*background: #46473F;*/
    /*width: 100%;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
  /*}*/
  .header18{
    position: fixed;
    left: 200px;
    right: 0px;
    height: 60px;
    line-height: 60px;
    background: rgb(255,255,255);
  }
  .header8{
    position: fixed;
    left: 100px;
    right: 0;
    height: 60px;
    line-height: 60px;
    background: rgb(255,255,255);
  }
</style>
