<template>
    <div class='history'>
      <div class="searchselect">
        <input type="text" name='storageId'  hidden>
        <!--<div class='div-inp'>-->
          <!--<label for='date1'>-->
            <!--<span style="width: 115px;">借用时间范围:</span>-->
            <!--<input style="margin-left: 125px;"class="form-control form-input"  type="date" name='startTime' id='date1' v-model=startTime />-->
          <!--</label>-->
        <!--</div>-->
        <!--<div class='div-inp'>-->
          <!--<label for='date'>-->
            <!--<span style="width: 65px;">至:</span>-->
            <!--<input style='margin-left: 70px;' class="form-control form-input"  type="date" name='endTime' id='date' v-model=endTime />-->
          <!--</label>-->
        <!--</div>-->
        <!--<button class='btnfind' @click='showfind'>查询</button>-->
      </div>
      <div class="header">
        <div class="header-title">查询列表</div>
      </div>
      <div class="center">
        <table  class="table ">
          <thead>
          <tr>
            <th>物资图片</th>
            <th>物资编号</th>
            <th>物资名称</th>
            <th>借用人</th>
          </tr>
          </thead>
          <tbody style="display:block; height:460px;overflow-y: hidden">
          <tr v-for='(item, index) in historydata' >
            <td><img :src= imgsArr[index] alt="" style='width: 40px;height: 40px;'></td>
            <!--<td><input type="checkbox" name="checkbox" value="checkbox" ></td>-->
            <td>{{item.number}}</td>
            <td>{{item.name}}</td>
            <td>{{item.User.name}}</td>
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
    </div>

</template>

<script>
  import mopaging from '../devidePage/index.vue'
  import {mapGetters} from 'vuex'
  export default{
    data () {
      return {
        pageSize: 8,
        currentPage: 1,
        count: 0,
        list: [],
        imgsArr: [],
        historydata: [],
        startTime: '',
        endTime: ''
      }
    },
    components: {
      mopaging
    },
    computed: {
      ...mapGetters([
        'strogeId'
      ])
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('storageId', this.strogeId)
//        formdata.append('startTime', this.startTime)
//        formdata.append('endTime', this.endTime)
        console.log('1res.data-----')
        const res = await this.$http.post('http://localhost:3030/Material/BorrowingHistory', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('res.data-----')
        console.log(res.data)
        this.historydata = res.data
        var arr = []
        for (var i = 0; i < this.historydata.length; i++) {
          arr[i] = '/server/' + this.historydata[i].pic.split('/').join('')
        }
        this.imgsArr = arr
        this.get()
      })
    },
    methods: {
      get () {
        this.count = this.historydata.length
        for (var i = 0; i < Math.ceil(this.historydata.length / this.pageSize); i++) {
          this.list[i] = []
          for (var j = i * this.pageSize; j < (i + 1) * this.pageSize && j < this.historydata.length; j++) {
            this.list[i].push(this.historydata[j])
          }
        }
      },
      async showfind () {

      },
      pageChange (page) {
        this.currentPage = page
        this.historydata = this.list[page - 1]
      }
    },
    watch: {
      historydata (news) {
        this.historydata = news
      }
    }
  }
</script>

<style lang='less' scoped>
.history {
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
}
.btnfind{
  position: absolute;
  background:#56BE65;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 30px;
  font-size: 14px;
  margin-top: 10px;
}
</style>
