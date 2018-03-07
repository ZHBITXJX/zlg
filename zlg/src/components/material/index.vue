<template>
  <div class='store'>
    <div class="header">
      <input type="text" name='storageId' v-model='strogeId' hidden>
      <div class="header-title">物资列表</div>
      <div class="header-adddata">
        <div @click='showmaterialInput1' style="font-size: 16px">
          <i class="iconfont icon-jia i" ></i>新建
        </div>
      </div>
      <div class="header-search">
        <input type="text" placeholder='' ref='searchValue' name='search' v-model='search'>
        <div class='search-icon' @click='searchmethod()'><i class="iconfont icon-sousuo" style='color:white;font-size:18px'></i></div>
      </div>
    </div>
    <div class="center">
      <!---->
      <table  class="table ">
        <thead>
        <tr>
          <!--<th><input type="checkbox" name="checkbox" value="checkbox" >全选</th>-->
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
        <tr v-for='(item,index) in materialdata' >
          <!--<td><input type="checkbox" name="checkbox" value="checkbox" ></td>-->
          <td><img :src= imgsArr[index] alt="" style='width: 40px;height: 40px;'></td>
          <td v-show='false' name='id'>{{item.id}}</td>
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
          <td>
            <button @click='updatematerial(item, index)' style='background:#56BE65;color: white;border: 0;border-radius: 5px;display: inline'>修改</button>
            <button @click='deletematerial(item.id,index)' style="margin-left: 5px;background:#DC5250;color: white;border: 0;border-radius: 5px;">删除</button>
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
    <div v-show='isshowmaterial'>
      <div class='message'>

      </div>
      <div  class='edit'>
        <div class="title">
          <span class='title-name'>物资录入框</span>
          <span class='title-close' @click=' SHOW_MESSAGE(false)'>&times;</span>
        </div>
        <i class="iconfont icon-bianji i"></i>
        <div class="line"></div>
        <div class='box'>
          <div class='storeInput' v-show=false>
            <div class='div-inp'>
              <label for='id'>
                <span>id:</span>
                <input class="form-control form-input"  type="text" name='id' id='id'  v-model=p.id />
              </label>
            </div>
          </div>
          <div class='storeInput'>
            <div class='div-inp'>
              <label for='number'>
                <span>物资编号:</span>
                <input placeholder='非空' class="form-control form-input"  type="text" name='number' id='number'  v-model=p.number  />
                <span class='msg' v-show='!numberValue'>
                   ！
                  </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='name'>
                <span>物资名称:</span>
                <input placeholder='非空' class="form-control form-input" type="text" name='name' id='name' v-model=p.name />
                <span class='msg' v-show='!nameValue'>
                   ！
                  </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='location'>
                <span>物资位置:</span>
                <input placeholder='非空' class="form-control form-input" type="text" name='location' id='location'  v-model=p.location />
                <span class='msg' v-show='!locationValue'>
                  ！
                  </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='weight'>
                <span>物资重量:</span>
                <input class="form-control form-input" type="text" name='weight' id='weight'  v-model=p.weight />
              </label>
            </div>
            <div class='div-inp'>
              <label for='testTime'>
                <span>测试时间:</span>
                <input class="form-control form-input" type="date" name='testTime' id='testTime'  v-model=p.testTime />
              </label>
            </div>

            <div class='div-inp'>
              <label for='adopt'>
                <span>adopt:</span>
                <input class="form-control form-input" type="date" name='adopt' id='adopt'  v-model=p.adopt />
              </label>
            </div>
            <div class='div-inp'>
              <label for='status'>
                <span>状态:</span>
                <select name="status" id="status" class='form-control form-input' v-model=p.status style='font-size: 12px'>
                  <option value=true selected>可借用</option>
                  <option value=false>不可借用</option>
                </select>
              </label>
            </div>
            <div class='div-inp'>
              <label for='checkstatus'>
                <span>送检状态:</span>
                <select name="checkstatus" id="checkstatus" class='form-control form-input' v-model=p.checkstatus style='font-size: 12px'>
                  <option value=false>送检中</option>
                  <option value=true selected>未送检</option>
                </select>
              </label>
            </div>
            <div class='div-inp'>
              <label for='cabinetNumber'>
                <span>所属柜子number:</span>
                <select name="cabinetNumber" id="cabinetNumber" class='form-control form-input' v-model=p.Cabinet.number  style='font-size: 12px'>
                  <option v-for='(item, index) in cabinetNumberArr' :value="item">{{item}}</option>
                </select>
              </label>
            </div>
            <div class='div-inp'>
              <label for='pic'>
                <span>image:</span>
                <input ref='pic' class="" type="file" name='pic' id='pic'  @change="onfilechange" style="margin-left: 100px;" />
              </label>
              <a @click='prewive = true'>预览</a>
            </div>
            <input type="button" class="btn btn-primary btn-submit" value="提交" @click='submit'>
          </div>
        </div>
      </div>
    </div>
    <div class="message" v-show=prewive  style='position: fixed;width: 100%;height: 100%;'>
      <div class="imgdiv" style='position: fixed;width: 400px;height: 400px;border-radius: 15px;top: 50%;left: 50%;
      transform: translate(-50%, -50%);background-color: #FFFFFF;'>
        <div class="close" style='position: absolute;right: 2%;top: 2%;' @click='prewive = false'>&times;</div>
        <img :src='image' alt=""style='position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);width: 200px;height: 200px'>
      </div>
    </div>
  </div>

</template>
<script>
  import mopaging from '../devidePage/index.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data () {
      return {
        materialdata: [],
        search: '',
        p: {
          id: '',
          number: '',
          name: '',
          location: '',
          weight: '',
          testTime: '',
          adopt: '',
          status: true,
          chekstatus: true,
          Cabinet: {
            number: ''
          },
          pic: ''
        },
        pageSize: 8,
        currentPage: 1,
        count: 0,
        list: [],
        imgsArr: [],
        image: '',
        prewive: false,
        updateIndex: 0,
        cabinetNumberArr: []
      }
    },
    components: {
      mopaging
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('storageId', this.strogeId)
        const res = await this.$http.post('http://localhost:3030/Material', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.materialdata = res.data
        var arr = []
        for (var i = 0; i < this.materialdata.length; i++) {
          arr[i] = '/server/' + this.materialdata[i].pic.split('/').join('')
        }
        this.imgsArr = arr
        this.get()
        this.getCabinetNumber()
      })
    },
    computed: {
      ...mapGetters([
        'isshowmaterial',
        'strogeId'
      ]),
      numberValue () {
//        return /^[\d]{1,6}$/.test(this.p.number)
        return this.p.number.length > 0 ? 1 : 0
      },
      nameValue () {
//        return /^[\u4e00-\u9fa5]{1,10}$/.test(this.p.name)
        return this.p.name.length > 0 ? 1 : 0
      },
      locationValue () {
//        return /^[A-Z][\d]{2,4}$/.test(this.p.location)
        return this.p.location.length > 0 ? 1 : 0
      }
    },
    methods: {
      ...mapMutations(['SHOW_MESSAGE']),
      onfilechange: function (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.p.pic = files[0]
        this.createImage(this.p.pic)
      },
      createImage (file) {
        var reader = new FileReader()
        var vm = this
        reader.onload = (e) => {
          vm.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      get () {
        this.count = this.materialdata.length
        for (var i = 0; i < Math.ceil(this.materialdata.length / this.pageSize); i++) {
          this.list[i] = []
          for (var j = i * this.pageSize; j < (i + 1) * this.pageSize && j < this.materialdata.length; j++) {
            this.list[i].push(this.materialdata[j])
          }
        }
      },
      async getCabinetNumber () {
        this.cabinetNumberArr = []
        var formdata1 = new FormData()
        formdata1.append('storageId', this.strogeId)
        const res = await this.$http.post('http://localhost:3030/Cabinet/findCabinetInStorage', formdata1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        for (var i = 0; i < res.data.length; i++) {
          this.cabinetNumberArr.push(res.data[i].number)
        }
      },
      showmaterialInput1 () {
        this.SHOW_MESSAGE(true)
        this.p = {id: '', number: '', name: '', location: '', weight: '', testTime: '', adopt: '', Cabinet: {number: this.cabinetNumberArr[0]}, status: true, checkstatus: true}
      },
      updatematerial (item, index) {
        this.SHOW_MESSAGE(true)
        this.p = JSON.parse(JSON.stringify(item))
        this.updateIndex = index
      },
      async searchmethod () {
        if (this.search !== '') {
          var formdata = new FormData()
          formdata.append('search', this.search)
          formdata.append('storageId', this.strogeId)
          const result = await this.$http.post('http://localhost:3030/Material/queryMaterialInStorage', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.materialdata = result.data
          this.get()
        } else {
          var formdata1 = new FormData()
          formdata1.append('storageId', this.strogeId)
          const res = await this.$http.post('http://localhost:3030/Material', formdata1, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.materialdata = res.data
          this.get()
        }
      },
      async deletematerial (id, index) {
        var formdata = new FormData()
        formdata.append('id', id)
        const result = await this.$http.post('http://localhost:3030/Material/deleteMaterial', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data.deletefail) {
          alert(result.data.deletefail)
        } else {
          alert(result.data.deletesuccess)
          this.materialdata.splice(index, 1)
          this.get()
        }
      },
      async submit () {
        var formdata = new FormData()
        for (var key in this.p) {
          if (key === 'Cabinet') {
            formdata.append('cabinetNumber', this.p.Cabinet.number)
          } else {
            formdata.append(key, this.p[key])
          }
        }
        alert(formdata.get('cabinetNumber'))
        formdata.append('storageId', this.strogeId)
        if (this.numberValue && this.nameValue && this.locationValue) {
          const result = await this.$http.post('http://localhost:3030/Material/saveMaterial', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (this.p.id === '') {
            if (result.data.insert === 'ok') {
              this.SHOW_MESSAGE(false)
              var formdata1 = new FormData()
              formdata1.append('storageId', this.strogeId)
              const res = await this.$http.post('http://localhost:3030/Material', formdata1, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              this.materialdata.unshift(res.data[res.data.length - 1])
              this.get()
            } else {
              alert('fail')
            }
          } else if (this.p.id !== '') {
            if (result.data.update !== 'ok') {
              alert(result.data.update)
            } else if (result.data.update === 'ok') {
              alert('ok')
              var formdata2 = new FormData()
              formdata2.append('storageId', this.strogeId)
              const res = await this.$http.post('http://localhost:3030/Material', formdata2, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              for (var i = 0; i < res.data.length; i++) {
                for (var key in res.data[i]) {
                  if (res.data[i].id === this.p.id) {
                    alert('xxxxx')
                    this.materialdata[this.updateIndex] = res.data[i]
                    this.imgsArr[this.updateIndex] = '/server/' + this.materialdata[this.updateIndex].pic.split('/').join('')
                    break
                  }
                }
              }
              this.SHOW_MESSAGE(false)
            }
          }
        }
      },
      pageChange (page) {
        this.currentPage = page
        this.materialdata = this.list[page - 1]
      }
    },
    watch: {
      materialdata (news) {
        this.materialdata = news
        var arr = []
        for (var i = 0; i < this.materialdata.length; i++) {
          arr[i] = '/server/' + this.materialdata[i].pic.split('/').join('')
        }
        this.imgsArr = arr
      },
      imgsArr (val) {
        this.imgsArr = val
      }
    }
  }
</script>
<style lang='less' scoped>
  .store {
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
      .header-adddata {
        position: absolute;
        margin-left: 58.3%;
        width: 8%;
        line-height: 50px;
        height: 50px;
        div {
          text-align: center;
          position: absolute;
          width: 100%;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          padding: 0 5px;
          background-color: #408BCE;;
          color: white;
          border-radius: 6px;
        }
      }
      .header-search {
        position: absolute;
        margin-left: 68%;
        width: 31%;
        height: 50px;
        input {
          position: absolute;
          width: 85%;
          height: 25px;
          line-height: 25px;
          margin-top: 12.5px;
          border: 1px solid gainsboro;
          /*border-radius: 15px;*/
        }
        .search-icon {
          position: absolute;
          margin-left: 85%;
          width: 15%;
          height: 27px;
          line-height: 27px;
          margin-top: 11.5px;
          background-color: #408BCE;
          text-align: center;
        }
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
      width: 450px;
      height: 600px;
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
        .storeInput{
          .div-inp{
            height: 50px;
            label{
              span{
                position: absolute;
                width: 100px;
              }
              .msg{
                position: absolute;
                width: 30px;
                margin-left: 360px;
                color: red;
              }
              ::-webkit-input-placeholder {
                font-size: 12px !important;
              }
              .form-control {
                position: absolute;
                margin-left: 100px;
                width: 250px;
                height: 33px;
                padding: 6px 12px;
                font-size: 15px;
                line-height: 1.42857143;
                color: black;
                box-sizing: border-box;
              }
              .form-control:focus {
                border-color: rgba(59,137,245, 0.5);
                outline: 0;
                -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(59,137,245, 0.6);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(59,137,245, 0.6);
              }
              .form-input{
                background: rgba(214,222,206,0.5);
                border: 2px solid rgba(255,255,255,0.3);
                box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px rgba(255,255,255,0.2);
              }
            }
          }
          .btn{
            position: absolute;
            margin-left: 290px;
            color: #fff;
            display: inline-block;
            margin-bottom: 0;
            font-weight: normal;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 6px 12px;
            font-size: 13px;
            line-height: 1.42857143;
            border-radius: 10px;
            -webkit-user-select: none;
          }
          .btn-submit{
            width: 60px;
            height: 35px;
            background-color: #2db7f5;
            border-color: #2db7f5;
            margin-top:0px;
          }
          .btn-submit:hover{
            color: #fff;
            background-color: #0C6CED;
            border-color: #0C6CED;
            text-decoration: none;
          }
        }
      }
    }
  }
  .select{
    select: selected;
  }
</style>
