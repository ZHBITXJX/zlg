<template>
      <div class='leftBar18' v-if='leftbar'>
        <div class='logo'>Director</div>
        <ul  class="pageul">
          <li v-for='(item,index) in routers' v-if='item.children'  @click='setPath(item.path,item.children[0].path,item.children[0].name,item.children[0].icon,index,routers)' :class="{'active':item.active}">
            <i class='i' v-for='iitem in item.children' :class='iitem.icon'></i>
            <span class='name' v-for='sitem in item.children'>{{sitem.name}}</span>
            <span class='r'></span>
          </li>
        </ul>
      </div>
      <div class='leftBar8' v-else>
        <div class='logo'>Director</div>
        <ul  class="pageul">
          <li v-for='(item,index) in routers' v-if='item.children'  @click='setPath(item.path,item.children[0].path,item.children[0].name,item.children[0].icon,index,routers)' :class="{'active':item.active}">
            <i class='i' v-for='iitem in item.children' :class='iitem.icon'></i>
          </li>
        </ul>
      </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default{
    props: {
      routers: {
        type: Array
      }
    },
    data () {
      return {
//        默认当前路径在首页
        currentPathArray: [
          {
            path: '/firstPage/index',
            name: '首页',
            icon: 'iconfont icon-homepage_fill',
            active: true
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'leftbar',
        'routers'
      ])
    },
    methods: {
      ...mapMutations(['SET_PATH']),
//      点击设置添加路径方法，加入已开路径数组
      setPath (fpath, zpath, zname, zicon, index, routers) {
        for (var i = 0; i < routers.length; i++) {
          if (i === index) {
            routers[index].active = true
          } else {
            routers[i].active = false
          }
        }
//        定义局部变量存放当前点击路径
        var currentPath = {
          path: '',
          name: '',
          icon: '',
          active: true
        }
        currentPath.path = fpath + '/' + zpath
        currentPath.name = zname
        currentPath.icon = zicon
//        跳转到当前点击路径
        this.$router.push(currentPath.path)
        for (var j = 0; j < this.currentPathArray.length; j++) {
          if (currentPath.path === this.currentPathArray[j].path) {
            this.currentPathArray[j].active = true
          } else {
            this.currentPathArray[j].active = false
          }
        }
//        添加路径到数组方法
        for (var k = 0; k < this.currentPathArray.length; k++) {
          if (this.currentPathArray[k].path === currentPath.path) {
            break
          }
        }
        if (k === this.currentPathArray.length) {
          for (var l = 0; l < this.currentPathArray.length; l++) {
            this.currentPathArray[l].active = false
          }
          this.currentPathArray.push(currentPath)
          this.SET_PATH(this.currentPathArray)
        }
      }
    }
  }
</script>

<style lang='less' scoped>
.leftBar18{
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: #353D47;
  /*background: white;*/
  .logo{
    position: absolute;
    width:100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: white;
    font-size: 16px;
    background: rgb(40,55,68);
    /*background: white;*/
  }
  .pageul{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 80px;
    list-style: none;
    padding: 0;
    li{
      width: 100%;
      height: 45px;
      line-height: 45px;
      color: white;
      /*background: rgb(57,74,89);*/
      .i{
        position: absolute;
        left: 2%;
        font-size: 20px;
      }
      span.name{
        position: absolute;
        left: 20%;
        font-size: 15px;
      }
      span.r{
        position: absolute;
        right: 3%;
        i{
          font-size: 12px;
        }
      }
    }
  }
}
.leftBar8 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background: #353D47;
  .logo{
    position: absolute;
    width:100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: white;
    font-size: 16px;
    background: rgb(40,55,68);
  }
  .pageul{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 80px;
    list-style: none;
    padding: 0;
    li{
      width: 100%;
      height: 45px;
      line-height: 45px;
      /*color: #353D47;*/
      color: white;
      text-align: center;
      /*background: rgb(57,74,89);*/
      .i{
        /*position: absolute;*/
        font-size: 24px;
      }
      }
    }
 }
  .active{
    background: white;
    color: #353D47 !important;
  }
  .active8{
    color:blue;
  }
</style>
