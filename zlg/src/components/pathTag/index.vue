<template>
  <div class='leftBar18' v-if='leftbar'>
      <div class="tags-con">
        <nav>
          <div class='router' v-for='(item,index) in currentPathArray1' :class="{'active':item.active}" @click='activePath(index)'>
            <router-link  :to='item.path' class='router' >
              <i :class='item.icon'></i>
              <span class='name'>{{item.name}}</span>
            </router-link>
            <span class='close' @click='closePath(index)'>
            &times;
            </span>
          </div>
        </nav>
      </div>
       <div class='page'>
         <router-view></router-view>
       </div>
  </div>

  <div class='leftBar8' v-else>
    <div class="tags-con">
      <nav>
        <div class='router' v-for='(item,index) in currentPathArray1' :class="{'active':item.active}" @click='activePath(index)'>
          <router-link  :to='item.path' class='router'>
            <i :class='item.icon'></i>
            <span class='name'>{{item.name}}</span>
          </router-link>
          <span class='close' @click='closePath(index)'>
            &times;
            </span>
        </div>
      </nav>
    </div>
    <div class='page'>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data () {
      return {
      }
    },
    created: function () {
      console.log(this.identity)
      this.SET_ROUTER({data: '', identity: this.identity})
      console.log('cc')
    },
    computed: {
      ...mapGetters([
        'leftbar',
        'currentPathArray1',
        'routers',
        'identity'
      ])
    },
    methods: {
      ...mapMutations(['DELETE_PATH', 'SET_ROUTER']),
      activeL (index) {
        for (var i = 0; i < this.currentPathArray1.length; i++) {
          if (i === index) {
            console.log(this.currentPathArray1)
            this.currentPathArray1[i].active = true
            console.log(this.currentPathArray1[i])
            for (var j = 0; j < this.routers.length; j++) {
              if (this.routers[j].children) {
                if (this.routers[j].children[0].name === this.currentPathArray1[i].name) {
                  this.routers[j].active = true
                  this.SET_ROUTER({data: this.routers, identity: this.identity})
                  console.log(this.routers)
                } else {
                  this.routers[j].active = false
                  this.SET_ROUTER({data: this.routers, identity: this.identity})
                }
              }
            }
          } else {
            this.currentPathArray1[i].active = false
          }
        }
      },
      activePath (index) {
        this.activeL(index)
      },
      closePath (index) {
        if (index - 1 < 0 && !this.currentPathArray1[index + 1]) {
          this.$router.push('/')
          for (var i = 0; i < this.routers.length; i++) {
            this.routers[i].active = false
          }
          this.SET_ROUTER({data: this.routers, identity: this.identity})
        } else if (index - 1 < 0 && this.currentPathArray1[index + 1]) {
          this.$router.push(this.currentPathArray1[index + 1].path)
          this.activeL(index + 1)
          this.currentPathArray1[index + 1].active = true
        } else {
          if (this.currentPathArray1[index + 1]) {
            this.$router.push(this.currentPathArray1[index + 1].path)
            this.activeL(index - 1)
            this.currentPathArray1[index - 1].active = true
          } else {
            this.$router.push(this.currentPathArray1[index - 1].path)
            this.activeL(index - 1)
            this.currentPathArray1[index - 1].active = true
          }
        }
        this.DELETE_PATH(index)
      }
    }
  }
</script>

<style lang='less' scoped>
  .leftBar18 {
    .tags-con{
      position: fixed;
      top: 70px;
      left: 210px;
      right: 10px;
      /*width: 80%;*/
      height: 40px;
      /*background:#D4D4D4;*/
      background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#E3E3E3));
      .nav{
        position: absolute;
        height: 40px;
        line-height: 40px;
        width: 100%;
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#CBE1F8));
      }
      .router{
        display: inline-block;
        position: relative;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color:black;
        margin-right: 2px;
        i{
          position: absolute;
          left: 2%;
          font-size: 16px;
        }
        span.name{
          position: absolute;
          left: 30%;
          width: 60%;
          font-size: 15px;
        }
        .close{
          position: absolute;
          font-size: 16px;
          right: 2px;
          top: 2px;
        }
      }
    }
    .page{
      position: fixed;
      top: 120px;
      left: 210px;
      right: 10px;
      /*width: 80%;*/
      height: 100%;
      background: white;
    }
  }
  .leftBar8 {
    .tags-con{
      position: fixed;
      top: 70px;
      left: 110px;
      right: 10px;
      /*width: 90%;*/
      height: 40px;
      background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#E3E3E3));
      .nav{
        position: absolute;
        height: 40px;
        line-height: 40px;
        width: 100%;
      }
      .router{
        display: inline-block;
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        border-right: 1px solid whitesmoke;
        color:black;
        i{
          position: absolute;
          left: 2%;
          font-size: 16px;
        }
        span.name{
          position: absolute;
          left: 30%;
          width: 60%;
          font-size: 15px;
        }
        .close{
          position: absolute;
          font-size: 16px;
          right: 10px;
          top: 2px;
          color: black;
        }
        .fen{
          position: absolute;
          right: 2px;
          color: black;
        }
      }
    }
    .page{
      position: fixed;
      top: 120px;
      left: 110px;
      right: 10px;
      /*width: 90%;*/
      height: 100%;
      background: white;
    }
  }
  .active{
    /*background: white;*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#E3E3E3), to(#fff));
    color: #9E9E9E;
  }

</style>
