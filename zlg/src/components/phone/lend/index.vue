<template>
    <div>
      <div class="header">
        <input type="text" name='storageId' v-model=strogeId hidden>
        <div class="search">
          <input type="text" placeholder='输入工具名称' name='search' @change='searchmethod' v-model=search>
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>
      <ul class="ul">
        <li v-for='(item, index) in lists' @click='show(item.pic, item.name, item.status,index, item.id)'>
          <div class='img-box'>
            <img :src= imgsArr[index]  alt="">
          </div>
          <span class='name'>{{item.name}}</span>
        </li>
      </ul>
      <imgbox :pic='imgsrc' :name='name' :status='status' :index='index' :id='id'  v-show='isshowimg' @change='changestatus'></imgbox>
    </div>

</template>
<script>
  import imgbox from './img.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data () {
      return {
        lists: [],
        imgsrc: '',
        imgsArr: [],
        name: '',
        status: '',
        index: 0,
        id: 0,
        search: ''
      }
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('storageId', this.strogeId)
        const result = await this.$http.post('http://localhost:3030/Material/borrowMaterial', formdata, {
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
        'isshowimg',
        'strogeId'
      ])
    },
    components: {
      imgbox
    },
    methods: {
      ...mapMutations(['SET_IMG']),
      show (src, name, status, index, id) {
        this.imgsrc = src
        this.name = name
        this.status = status
        this.index = index
        this.id = id
        this.SET_IMG(true)
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
        formdata.append('storageId', this.strogeId)
        const result = await this.$http.post('http://localhost:3030/Material/borrowMaterial', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(result.data)
        this.lists = result.data
        this.show_image()
      },
      async searchmethod () {
        if (this.search === '') {
          var formdata = new FormData()
          formdata.append('storageId', this.strogeId)
          const result = await this.$http.post('http://localhost:3030/Material/borrowMaterial', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.lists = result.data
          this.show_image()
        } else {
          var formdata1 = new FormData()
          formdata1.append('storageId', this.strogeId)
          formdata1.append('search', this.search)
          const result = await this.$http.post('http://localhost:3030/Material/queryMaterialInStorage', formdata1, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log('result.data')
          console.log(result.data)
          this.lists = result.data
          this.show_image()
        }
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
  background: rgb(40,55,68);
  .search{
    position: fixed;
    top: 12.5px;
    width: 94%;
    left: 3%;
    background: #2db7f5;
    input{
      position: absolute;
      width: 100%;
      height: 35px;
      text-align: center;
    }
    i{
      position: absolute;
      left: 32%;
      line-height: 35px;
      color: grey;
    }
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
