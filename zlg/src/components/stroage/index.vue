<template>
  <div class='store' >
    <div class="header">
      <div class="header-title">库房列表</div>
      <div class="header-adddata">
        <div @click='showStoreInput1' style="font-size: 16px">
          <i class="iconfont icon-jia i" ></i>新建
        </div>
      </div>
      <div class="header-search">
        <input type="text" placeholder='编号/名称/位置/管理员工号' ref='searchValue' name='search' v-model='search'>
        <div class='search-icon' @click='searchmethod()'><i class="iconfont icon-sousuo" style='color:white;font-size:18px'></i></div>
      </div>
    </div>
    <div class="center">
      <!---->
      <table  class="table ">
        <thead>
        <tr>
          <!--<th><input type="checkbox" name="checkbox" value="checkbox" >全选</th>-->
          <th>库房编号</th>
          <th>库房名称</th>
          <th>库房位置</th>
          <th>登录账号</th>
          <th>登录密码</th>
          <th>库房状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody style="display:block; height:395px;overflow-y: hidden">
        <tr v-for='(item,index) in storedata' >
          <!--<td><input type="checkbox" name="checkbox" value="checkbox" ></td>-->
          <td v-show='false' name='id'>{{item.id}}</td>
          <td>{{item.number}}</td>
          <td>{{item.name}}</td>
          <td>{{item.location}}</td>
          <td>{{item.username}}</td>
          <td>{{item.password}}</td>
          <td v-if=item.status>已使用</td>
          <td v-else>未使用</td>
          <td>
            <button @click='updateStore(item, index)' style='background:#56BE65;color: white;border: 0;border-radius: 5px'>修改</button>
            <button @click='deleteStore(item.id,index)' style="margin-left: 15px;background:#DC5250;color: white;border: 0;border-radius: 5px">删除</button>
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
    <div v-show='isshow'>
      <div class='message'>

      </div>
      <div  class='edit'>
        <div class="title">
          <span class='title-name'>库房录入框</span>
          <span class='title-close' @click='SHOW_MESSAGE(false)'>&times;</span>
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
            <form>
            <div class='div-inp'>
              <label for='number'>
                <span>库房编号:</span>
                <input placeholder='非空' class="form-control form-input"  type="text" name='number' id='number'  v-model=p.number />
                <span class='msg' v-show='!numberValue'>
                 ！
                </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='name'>
                <span>库房名称:</span>
                <input placeholder='非空' class="form-control form-input" type="text" name='name' id='name' v-model=p.name />
                <span class='msg' v-show='!nameValue'>
                 ！
                </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='location'>
                <span>库房位置:</span>
                <input placeholder='非空' class="form-control form-input" type="text" name='location' id='location'  v-model=p.location />
                <span class='msg' v-show='!locationValue'>
                 ！
                </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='username'>
                <span>登录账号:</span>
                <input placeholder='非空' class="form-control form-input" type="text" name='username' id='username' v-model=p.username />
                <span class='msg' v-show='!usernameValue'>
                 ！
                </span>
              </label>
            </div>
            <div class='div-inp'>
              <label for='password'>
                <span>登录密码:</span>
                <input placeholder='非空，数字字母下划线组合，长度6' class="form-control form-input" type="text" name='password' id='password' v-model=p.password />
                <span class='msg' v-show='!passwordValue'>
                 ！
                </span>
              </label>
            </div>
              <div class='div-inp'>
                <label for='status'>
                  <span>状态:</span>
                  <select name="status" id="status" class='form-control form-input' v-model=p.status style='font-size: 12px'>
                    <option value=true >已使用</option>
                    <option value=false selected='selected'>未使用</option>
                  </select>
                  <!--<input class="form-control form-input" type="text" name='status' id='status' v-model=p.status />-->
                </label>
              </div>
            <input type="button" class="btn btn-primary btn-submit" value="提交" @click='submit'>
            </form>
          </div>
        </div>
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
        storedata: [],
        search: '',
        p: {
          id: '',
          number: '',
          name: '',
          location: '',
          username: '',
          password: '',
          status: false
        },
        pageSize: 10,
        currentPage: 1,
        count: 0,
        list: [],
        updateIndex: 0
      }
    },
    components: {
      mopaging
    },
    created () {
      this.$nextTick(async () => {
        const res = await this.$http.get('http://localhost:3030/Storage')
        this.storedata = res.data
        this.get()
      })
    },
    computed: {
      ...mapGetters([
        'isshow'
//        'storageInput'
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
      },
      usernameValue () {
//        return /^[^\d][\d\w]{5,9}$/.test(this.p.username)
        return this.p.username.length > 0 ? 1 : 0
      },
      passwordValue () {
        return /^[\d\w]{6}$/.test(this.p.password)
      }
    },
    methods: {
      ...mapMutations(['SHOW_MESSAGE']),
      get () {
        this.count = this.storedata.length
        for (var i = 0; i < Math.ceil(this.storedata.length / this.pageSize); i++) {
          this.list[i] = []
          for (var j = i * this.pageSize; j < (i + 1) * this.pageSize && j < this.storedata.length; j++) {
            this.list[i].push(this.storedata[j])
          }
        }
      },
      showStoreInput1 () {
        this.SHOW_MESSAGE(true)
        this.p = {id: '', number: '', name: '', location: '', username: '', password: '', status: false}
      },
      updateStore (item, index) {
        this.SHOW_MESSAGE(true)
        this.p = JSON.parse(JSON.stringify(item))
        this.updateIndex = index
      },
      async searchmethod () {
        if (this.search !== 0) {
          var formdata = new FormData()
          formdata.append('search', this.search)
          const result = await this.$http.post('http://localhost:3030/Storage/queryStorage', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.storedata = result.data
          this.get()
        } else {
          const res = await this.$http.get('http://localhost:3030/Storage')
          this.storedata = res.data
          this.get()
        }
      },
      async deleteStore (id, index) {
        var formdata = new FormData()
        formdata.append('id', id)
        const result = await this.$http.post('http://localhost:3030/Storage/deleteStorage', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data.deletefail) {
          alert(result.data.deletefail)
        } else {
          alert(result.data.deletesuccess)
          this.storedata.splice(index, 1)
          this.get()
        }
      },
      async submit () {
        var formdata = new FormData()
        for (var key in this.p) {
          if (key) {
            formdata.append(key, this.p[key])
          }
        }
        if (this.numberValue && this.nameValue && this.locationValue && this.usernameValue && this.passwordValue) {
          const result = await this.$http.post('http://localhost:3030/Storage/saveStorage', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (this.p.id === '') {
            if (result.data.add) {
              alert(result.data.add)
            } else if (result.data.backInfo === '0') {
              alert('增加失败')
            } else {
              alert('增加成功')
              this.SHOW_MESSAGE(false)
              const res = await this.$http.get('http://localhost:3030/Storage')
              this.storedata.unshift(res.data[res.data.length - 1])
              this.get()
            }
          } else if (this.p.id !== '') {
            if (result.data.update === 'ok') {
              alert(result.data.update)
              const res = await this.$http.get('http://localhost:3030/Storage')
              for (var i = 0; i < res.data.length; i++) {
                for (var key in res.data[i]) {
                  if (res.data[i].id === this.p.id) {
                    alert('xxxxx')
                    this.storedata[this.updateIndex] = res.data[i]
                    break
                  }
                }
              }
//              this.storedata[this.updateIndex] = this.p
//              this.$set(this.storedata[this.updateIndex] , 'status', this.p.status )
//              alert(this.storedata[this.updateIndex].status)
              this.SHOW_MESSAGE(false)
            } else if (result.data.update === 'fail') {
              alert('failaa')
              alert('修改失败')
            }
          }
        }
      },
      pageChange (page) {
        this.currentPage = page
        this.storedata = this.list[page - 1]
      }
    },
    watch: {
      storedata (news) {
        this.storedata = news
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
          background-color: #408BCE;
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
      .table{
        /*border: 1px solid #000;*/
      }
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
              ::-webkit-input-placeholder {
                font-size: 12px !important;
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
            margin-top: 20px;
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
</style>
