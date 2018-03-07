<template>
    <div>
      <div class="header">
        <span class="title"> 我的信息 </span>
        <span class="exit" @click='exit'> 注销 </span>
      </div>
      <div class="user">
        <input type="text" name='storageId' v-model=strogeId hidden>
        <img :src= 'src' alt="">
        <input type="file" hidden class='input' name='pic' id='pic'  @change="onfilechange">
      </div>
      <div class="form">
        <input type="text" name='id' v-model=p.id  hidden>
        <form action="">
          <div class="form-input">
             <label for='name'>
               姓名：
             </label>
            <input type="text" id='name' name='name' v-model=p.name>
          </div>
          <div class="form-input">
            <label for='username'>
              登录账号：
            </label>
            <input type="text" id='username' name='username' v-model=p.username disabled>
          </div>
          <div class="form-input">
            <label for='password'>
              登录密码：
            </label>
            <input type="text" id='password' name='password' v-model=p.password disabled>
          </div>
          <div class="form-input">
            <label for='department'>
              部门：
            </label>
            <input type="text" class='department' id='department' name='department' v-model=p.department>
          </div>
          <div class="form-input">
            <label for='phonenumber'>
              手机：
            </label>
            <input type="text" class='phonenumber' id='phonenumber' name='phonenumber' v-model=p.phonenumber>
          </div>
          <button @click='updateInfo'>保存</button>
        </form>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    data () {
      return {
        p: {
          id: '',
          name: '',
          username: '',
          password: '',
          department: '',
          phonenumber: '',
          pic: ''
        },
        src: ''
      }
    },
    created () {
      this.$nextTick(function () {
        alert('1111111111')
        console.log('this.user')
        console.log(this.user)
        this.p = JSON.parse(JSON.stringify(this.user))
        this.src = '/server/' + this.p.pic.split('/').join('')
        console.log(this.p)
      })
    },
    computed: {
      ...mapGetters([
        'strogeId',
        'user'
      ])
    },
    methods: {
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
          vm.src = e.target.result
        }
        reader.readAsDataURL(file)
      },
      exit () {
        this.$router.push('/login')
      },
      async updateInfo () {
        alert('111')
        var formdata = new FormData()
        for (var key in this.p) {
          if (key) {
            formdata.append(key, this.p[key])
          }
        }
        formdata.append('storageId', this.strogeId)
        console.log(formdata.get('id'))
        console.log(formdata.get('name'))
        console.log(formdata.get('pic'))
        alert('xujiaxuan')
        const result = await this.$http.post('http://localhost:3030/User/saveUser', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert('xujiaxuanxxxx')
        console.log(result.data)
        this.user = this.p
      }
    }
  }
</script>

<style lang='less' scoped>
.header{
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  top: 0;
  background-color: rgb(40,55,68);
  text-align: center;
  .exit{
    position: fixed;
    height: 60px;
    line-height: 60px;
    top: 0;
    right: 2%;
    color: white;
  }
  .title{
    font-size: 15px;
    color: white;
  }
}
.user{
  position: fixed;
  top: 60px;
  width: 100%;
  height: 120px;
  /*border: 1px solid #000;*/
  img{
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /*border: 1px solid #000;*/
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .input{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.form{
  position: fixed;
  top: 180px;
  width: 100%;
  padding-bottom: 20px;
  .form-input{
    position: relative;
    width: 80%;
    left: 10%;
    height: 50px;
    line-height: 50px;
    label{
      position: absolute;
      width: 28%;
      text-align: right;
      font-weight: bold;
      font-size: 12px;
    }
    input{
      position: absolute;
      width: 70%;
      left: 30%;
      height: 30px;
      margin-top: 10px;
      border: 0;
      border-bottom: 1px solid #FDCBCC;
      background: #F9F9F9;
    }
  }
  button{
    width: 30%;
    height: 30px;
    margin-top: 20px;
    border: 0;
    border-radius: 10px;
    color: white;
    margin-left: 35%;
    background: #FF6766;
  }
}

</style>
