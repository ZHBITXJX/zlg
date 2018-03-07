<template>
  <div>
    <div class="header">
      <span class="title"> 借用列表 </span>
    </div>
    <ul class="ul">
      <li v-for='(item,index) in lists' @click='show(item.pic, item.name, item.status,index, item.id)'>
        <div class='img-box'>
          <img :src=imgsArr[index]  alt="">
        </div>
        <span class='name'>{{item.name}}</span>
      </li>
    </ul>
    <imgbox :pic='imgsrc' :name='name' :status='status' :id='id' v-show='isshowreturnimg' @change='changestatus'></imgbox>
  </div>

</template>
<script>
  import imgbox from './img.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data () {
      return {
        lists: [
        ],
        imgsrc: '',
        imgsArr: [],
        name: '',
        status: '',
        id: 0
      }
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('userId', this.userId)
        const result = await this.$http.post('http://localhost:3030/Material/loanedMaterial', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(result.data)
        this.lists = result.data
        this.show_image()
      })
    },
    computed: {
      ...mapGetters([
        'isshowreturnimg',
        'userId'
      ])
    },
    components: {
      imgbox
    },
    methods: {
      ...mapMutations(['SET_RETURNIMG']),
      show (src, name, status, index, id) {
        this.imgsrc = src
        this.name = name
        this.status = status
        this.index = index
        this.id = id
        this.SET_RETURNIMG(true)
      },
      show_image () {
        var arr = []
        for (var i = 0; i < this.lists.length; i++) {
          arr[i] = '/server/' + this.lists[i].pic.split('/').join('')
        }
        this.imgsArr = arr
      },
      async changestatus () {
        var formdata = new FormData()
        formdata.append('userId', this.userId)
        const result = await this.$http.post('http://localhost:3030/Material/loanedMaterial', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(result.data)
        this.lists = result.data
        this.show_image()
      }
    },
    watch: {
      lists (val) {
        this.lists = val
      }
    }
  }
</script>
<style lang='less' scoped>
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: rgb(40,55,68);
    text-align: center;
    .title{
      font-size: 15px;
      color: white;
    }
  }
  .ul {
    float: left;
    position: fixed;
    top: 60px;
    bottom: 60px;
    width: 100%;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /*border: 1px solid #000;*/
    list-style: none;
    li {
      position: relative;
      float: left;
      width: 50%;
      height: 150px;
      /*border: 1px solid #000;*/
      .img-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        width: 90%;
        height: 80%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .name{
        position: absolute;
        width: 100%;
        height: 20%;
        line-height: 2;
        bottom: 0;
        text-align: center;
      }
    }
  }
  /*}*/
</style>
