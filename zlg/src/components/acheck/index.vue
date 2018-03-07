<template>
  <div class='check'>
    <div class="header">
      <input type="text" name='storageId' v-model='strogeId' hidden>
      <input type="text" name='id'  hidden>
      <input type="text" name='adopt'  hidde v-model=adopt hidden>
      <div class="header-title">送检列表</div>
    </div>
    <div class="center">
      <table  class="table ">
        <thead>
        <tr>
          <th>物资图片</th>
          <th>物资编号</th>
          <th>物资名称</th>
          <th>物资位置</th>
          <th>物资重量</th>
          <th>测试时间</th>
          <th>adopt</th>
          <th>状态</th>
          <th>送检状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody style="display:block; height:460px;overflow-y: hidden">
        <tr v-for='(item,index) in acheckdata' >
          <td><img :src= imgsArr[index] alt="" style='width: 40px;height: 40px;'></td>
          <!--<td v-show='false' name='id'>{{item.id}}</td>-->
          <td>{{item.number}}</td>
          <td>{{item.name}}</td>
          <td>{{item.location}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.testTime}}</td>
          <td>{{item.adopt}}</td>
          <td v-if="item.status">可借用</td>
          <td v-else>不可使用</td>
          <td v-if="!item.checkstatus">送检中</td>
          <td v-else>未送检</td>
          <td><button @click='endcheck(item, index)' style='background:#56BE65;color: white;border: 0;border-radius: 5px'>检修完</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="page" style='position:absolute;height:40px;right: 0%;line-height:40px;text-align: left'>
        <mopaging
          :pageIndex="currentPage"
          :total="count"
          :pageSize="pageSize"
          @change="pageChange">
        </mopaging>
      </div>
    </div>
    <div class="ischeck" v-show='ischeck'>
      <div class='message'>
      </div>
      <div  class='edit'>
        <div class="title">检修完成框</div>
        <div class="is">检修完成？</div>
        <div class="button">
          <button @click='sure'>确定</button>
          <button @click='deny'>取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import mopaging from '../devidePage/index.vue'
  import {mapGetters} from 'vuex'
  export default{
    data () {
      return {
        startTime: '',
        adopt: '',
        pageSize: 8,
        currentPage: 1,
        count: 0,
        list: [],
        imgsArr: [],
        acheckdata: [],
        ischeck: false,
        item: [],
        index: 0
      }
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('storageId', this.strogeId)
        const res = await this.$http.post('http://localhost:3030/Material/needRepairMaterial', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res.data)
        this.acheckdata = res.data
        var arr = []
        for (var i = 0; i < this.acheckdata.length; i++) {
          arr[i] = '/server/' + this.acheckdata[i].pic.split('/').join('')
        }
        this.imgsArr = arr
        this.get()
      })
    },
    components: {
      mopaging
    },
    computed: {
      ...mapGetters([
        'strogeId'
      ])
    },
    methods: {
      get () {
        this.count = this.acheckdata.length
        for (var i = 0; i < Math.ceil(this.acheckdata.length / this.pageSize); i++) {
          this.list[i] = []
          for (var j = i * this.pageSize; j < (i + 1) * this.pageSize && j < this.acheckdata.length; j++) {
            this.list[i].push(this.acheckdata[j])
          }
        }
      },
      pageChange (page) {
        this.currentPage = page
        this.acheckdata = this.list[page - 1]
      },
      endcheck (item, index) {
        this.ischeck = true
        this.item = item
        this.index = index
      },
      async sure () {
        var date = new Date()
        var year = date.getFullYear()
        var mouth = date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + parseInt(date.getDate()) : date.getDate()
        this.adopt = year + '/' + mouth + '/' + day
        var formdata = new FormData()
        formdata.append('adopt', this.adopt)
        formdata.append('id', this.item.id)
        console.log(formdata.get('id'))
        console.log(formdata.get('adopt'))
        const res = await this.$http.post('http://localhost:3030/Material/materialMeasurement', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('res.data')
        console.log(res.data)
        this.acheckdata.splice(this.index, 1)
        this.imgsArr.splice(this.index, 1)
        this.get()
        this.ischeck = false
      },
      deny () {
        this.ischeck = false
      }
    },
    watch: {
      acheckdata (news) {
        this.acheckdata = news
      }
    }
  }
</script>

<style lang='less' scoped>
  .check {
    position: relative;
    .header {
      position: absolute;
      width: 100%;
      height: 50px;
      /*border: 1px solid #000;*/
      .header-title {
        position: absolute;
        margin-left: 1%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .center {
      position: absolute;
      width: 98%;
      margin:0 1%;
      margin-top: 50px;
      .table thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;//core code
      }
      .table th,.table td{
        /*line-height: 30px;*/
        border: 0;
      }
      .table thead>tr>th{
        height: 40px;
        bottom: 0;
        line-height: 40px;
        font-size: 13px;
      }
      .table tbody>tr{
        border-top:1px solid #D9D9D9;
      }
      .table tbody>tr:nth-child(even){
        background: #FAFAFA;
      }
    }
    .message{
      width:100%;
      height:100%;
      background-color:#39435C;
      filter:alpha(opacity=80);
      -moz-opacity:0.8;
      opacity:0.8;
      position:fixed;
      left:0px;
      top:0px;
    }
    .edit{
      position: fixed;
      width: 350px;
      height: 200px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #FFFFFF;
      box-shadow: 5px 5px 20px grey;
      .title{
        color: white;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        background-color: rgb(50,213,223);
      }
      .is{
        text-align: center;
        font-size: 17px;
        font-weight: bolder;
        margin-top: 20px;
      }
      .button{
        text-align: center;
        margin-top: 20px;
        button{
          width: 70px;
          height: 40px;
          background-color: rgb(50,213,223);
          color: white;
          border: 0;
          border-radius: 3px;
        }
      }
    }
  }

</style>
