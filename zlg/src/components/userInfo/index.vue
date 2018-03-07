<template>
  <div class='store' >
    <div class="header">
      <div class="header-title">用户列表</div>
      <div class="header-adddata">
        <div @click='showUserInput1' style="font-size: 16px">
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
          <th>头像</th>
          <th>姓名</th>
          <th>登录账号</th>
          <th>登录密码</th>
          <th>部门</th>
          <th>手机</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody style="display:block; height:460px;overflow-y: hidden">
        <tr v-for='(item,index) in userdata' >
          <td><img :src=imgsArr[index] alt="" style='width: 40px;height: 40px;border-radius: 50%;'></td>
          <!--<td><input type="checkbox" name="checkbox" value="checkbox" ></td>-->
          <td v-show='false' name='id'>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.username}}</td>
          <td>{{item.password}}</td>
          <td>{{item.department}}</td>
          <td>{{item.phonenumber}}</td>
          <td>
            <button @click='updateUser(item,index)' style='background:#56BE65;color: white;border: 0;border-radius: 5px'>修改</button>
            <button @click='deleteUser(item.id,index)' style="margin-left: 15px;background:#DC5250;color: white;border: 0;border-radius: 5px">删除</button>
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
    <div v-show='isshowUser'>
      <div class='message'>

      </div>
      <div  class='edit'>
        <div class="title">
          <span class='title-name'>用户录入框</span>
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
              <div class='div-inp' v-show=true>
                <label for='strogeId'>
                  <span>所属库房id:</span>
                  <input disabled class="form-control form-input"  type="text" name='storageId' id='strogeId'  v-model=strogeId />
                </label>
              </div>
              <div class='div-inp'>
                <label for='username'>
                  <span>登录账号:</span>
                  <input placeholder='非空'class="form-control form-input" type="text" name='username' id='username' v-model=p.username />
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
                <label for='name'>
                  <span>姓名:</span>
                  <input class="form-control form-input" type="text" name='name' id='name' v-model=p.name />
                </label>
              </div>
              <div class='div-inp'>
                <label for='department'>
                  <span>部门:</span>
                  <input class="form-control form-input" type="text" name='department' id='department' v-model=p.department />
                </label>
              </div>
              <div class='div-inp'>
                <label for='phonenumber'>
                  <span>手机:</span>
                  <input class="form-control form-input" type="text" name='phonenumber' id='phonenumber' v-model=p.phonenumber />
                  <span class='msg' v-show='!phonenumberValue'>
                 ！
                </span>
                </label>
              </div>
              <div class='div-inp'>
                <label for='pic'>
                  <span>image:</span>
                  <input  class="" type="file" name='pic' id='pic'  @change="onfilechange" style="margin-left: 100px;" />
                </label>
                <!--<div v-if='image'>{{image}}</div>-->
                <a @click='prewive = true'>预览</a>
              </div>
              <input type="button" class="btn btn-primary btn-submit" value="提交" @click='submit()'>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="message" v-show=prewive  style='position: fixed;width: 100%;height: 100%;'>
      <div class="imgdiv" style='position: fixed;width: 400px;height: 400px;border-radius: 15px;top: 50%;left: 50%;
      transform: translate(-50%, -50%);background-color: #FFFFFF;'>
        <div class="close" style='position: absolute;right: 2%;top: 2%;' @click='prewive = false'>&times;</div>
        <img :src='image' alt=""style='border-radius: 50%;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);width: 200px;height: 200px'>
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
        userdata: [],
        search: '',
        p: {
          id: '',
          name: '',
          username: '',
          password: '',
          department: '',
          phonenumber: '',
          pic: ''
        },
        pageSize: 8,
        currentPage: 1,
        count: 0,
        list: [],
        imgsArr: [],
        image: '',
        prewive: false,
        updateIndex: 0
      }
    },
    components: {
      mopaging
    },
    created () {
      this.$nextTick(async () => {
        var formdata = new FormData()
        formdata.append('storageId', this.strogeId)
        const res = await this.$http.post('http://localhost:3030/User', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.userdata = res.data
        this.get()
        var arr = []
        for (var i = 0; i < this.userdata.length; i++) {
          arr[i] = '/server/' + this.userdata[i].pic.split('/').join('')
        }
        this.imgsArr = arr
      })
    },
    computed: {
      ...mapGetters([
        'isshowUser',
        'strogeId'
      ]),
      usernameValue () {
//        return /^[^\d][\d\w]{5,9}$/.test(this.p.username)
        return this.p.username.length > 0 ? 1 : 0
      },
      passwordValue () {
        return /^[\d\w]{6}$/.test(this.p.password)
      },
      phonenumberValue () {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(this.p.phonenumber)
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
        this.count = this.userdata.length
        for (var i = 0; i < Math.ceil(this.userdata.length / this.pageSize); i++) {
          this.list[i] = []
          for (var j = i * this.pageSize; j < (i + 1) * this.pageSize && j < this.userdata.length; j++) {
            this.list[i].push(this.userdata[j])
          }
        }
      },
      showUserInput1 () {
        this.SHOW_MESSAGE(true)
        this.p = {id: '', name: '', username: '', password: '', department: '', phonenumber: '', pic: ''}
      },
      updateUser (item, index) {
        this.SHOW_MESSAGE(true)
        this.p = JSON.parse(JSON.stringify(item))
        this.updateIndex = index
      },
      async searchmethod () {
        if (this.search !== 0) {
          var formdata = new FormData()
          formdata.append('storageId', this.strogeId)
          formdata.append('search', this.search)
          const result = await this.$http.post('http://localhost:3030/User/queryUserInStorage', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.userdata = result.data
          this.get()
        } else {
          var formdata1 = new FormData()
          formdata1.append('storageId', this.strogeId)
          const res = await this.$http.post('http://localhost:3030/User', formdata1, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.userdata = res.data
          this.get()
        }
      },
      async deleteUser (id, index) {
        var formdata = new FormData()
        formdata.append('id', id)
        const result = await this.$http.post('http://localhost:3030/User/deleteUser', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data.deletefail) {
          alert(result.data.deletefail)
        } else {
          alert(result.data.deletesuccess)
          this.userdata.splice(index, 1)
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
        formdata.append('storageId', this.strogeId)
        if (this.usernameValue && this.passwordValue && this.phonenumberValue) {
          const result = await this.$http.post('http://localhost:3030/User/saveUser', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (this.p.id === '') {
            if (!result.data.add) {
              alert('fail')
            } else {
              alert('增加成功')
              this.SHOW_MESSAGE(false)
              var formdata1 = new FormData()
              formdata1.append('storageId', this.strogeId)
              const res = await this.$http.post('http://localhost:3030/User', formdata1, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              this.userdata.unshift(res.data[res.data.length - 1])
              this.get()
            }
          } else if (this.p.id !== '') {
            if (result.data.update !== 'ok') {
              alert(result.data.update)
            } else if (result.data.update === 'ok') {
              alert('ok')
              this.userdata[this.updateIndex] = this.p
              var formdata2 = new FormData()
              formdata2.append('storageId', this.strogeId)
              const res = await this.$http.post('http://localhost:3030/User', formdata2, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              for (var i = 0; i < res.data.length; i++) {
                for (var key in res.data[i]) {
                  if (res.data[i].id === this.p.id) {
                    alert('xxxxx')
                    this.userdata[this.updateIndex] = res.data[i]
                    this.imgsArr[this.updateIndex] = '/server/' + this.userdata[this.updateIndex].pic.split('/').join('')
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
        this.userdata = this.list[page - 1]
      }
    },
    watch: {
      userdata (news) {
        this.userdata = news
        var arr = []
        for (var i = 0; i < this.userdata.length; i++) {
          arr[i] = '/server/' + this.userdata[i].pic.split('/').join('')
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
