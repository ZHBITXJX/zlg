<template>
    <div class='login'>
      <div class="loginbox">
          <div class='div-inp' style='margin-top: 20px;'>
            <i class="iconfont icon-iconfontyonghuming i"></i>
            <input class="form-control form-input" placeholder="username" type="text" name='username' v-model='p.username'/>
          </div>
          <div class='message' v-show='!usermsg' style='text-align: center;'>非空</div>
          <div class='message' v-show='usermsg' style='text-align: center;'></div>
          <div class="div-inp">
            <i class="iconfont icon-201 i"></i>
            <input class="form-control form-input" placeholder="password" type="password" name="password"  v-model='p.password'/>
          </div>
          <div class='message' v-show='!pwdmsg' style="text-align: center">非空，只能是数字字母下划线组合，长度6</div>
          <div class='message' v-show='pwdmsg' style="text-align: center"></div>
          <div class='label'>
          <label><input type="radio" name ="identity" v-model="p.identity" value="1"/>系统管理员</label>
          <label><input type="radio" name ="identity" v-model="p.identity" value="2"/>库房管理员</label>
          <label><input type="radio" name ="identity" v-model="p.identity" value="3"/>使用人</label>
          </div>
          <input type="button" class="btn btn-primary btn-submit" value="登录" @click='submit'>
      </div>
    </div>

</template>

<script>
  import {mapMutations} from 'vuex'
  import Cookies from 'js-cookie'
  export default{
    data () {
      return {
        p: {
          username: '',
          password: '',
          identity: '系统管理员'
        },
        logininentify: ''
      }
    },
    methods: {
      ...mapMutations(['SET_IDENTITY', 'SET_STROGEID', 'SET_USERID', 'SET_USER']),
      async submit () {
        let userInfo = {
          username: this.p.username,
          password: this.p.password,
          identity: this.p.identity
        }
        var formdata = new FormData()
        for (var key in this.p) {
          if (key) {
            formdata.append(key, this.p[key])
          }
        }
        if (this.usermsg && this.pwdmsg) {
          const res = await this.$http.post('http://localhost:3030/login', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          console.log(res.data)
          switch (res.data.backInfo) {
            case '0':
              alert('不存在该用户')
              break
            case '1':
              alert('login success')
              if (this.p.identity === '1') {
                this.logininentify = '系统管理员'
                this.SET_IDENTITY(this.logininentify)
                Cookies.set('userInfo', userInfo)
                this.$store.commit('setUserInfo', userInfo)
                this.$router.push('/firstPage/index')
              }
              if (this.p.identity === '2') {
                this.logininentify = '库房管理员'
                this.SET_IDENTITY(this.logininentify)
                Cookies.set('userInfo', userInfo)
                this.$store.commit('setUserInfo', userInfo)
                this.$router.push('/firstPage/index')
                this.SET_STROGEID(res.data.array[0].id)
              }
              if (this.p.identity === '3') {
                this.logininentify = '使用人'
                this.SET_IDENTITY(this.logininentify)
                this.SET_STROGEID(res.data.array[0].storageId)
                this.SET_USERID(res.data.array[0].id)
                this.SET_USER(res.data.array[0])
                Cookies.set('userInfo', userInfo)
                this.$store.commit('setUserInfo', userInfo)
                this.$router.push('/app/lend')
              }
              break
            case '2':
              alert('登录超时')
              break
          }
        } else {
          alert('error')
        }
      }
    },
    computed: {
      usermsg () {
        return this.p.username.length > 0 ? 1 : 0
      },
      pwdmsg () {
        return /^[\d\w]{6}$/.test(this.p.password)
      }
    }
  }
</script>

<style lang='less' scoped>
.login{
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../../assets/bg1.jpg') no-repeat;
  background-size:100% 100%;
  .loginbox{
    position: absolute;
    width: 400px;
    height: 260px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*border: 1px solid #000;*/
    background: white;
    .div-inp{
      position: relative;
      left: 2%;
      width: 96%;
      height: 40px;
      i{
        position: absolute;
        right: 5%;
        height: 40px;
        line-height: 40px;
        font-size:18px;
      }
      input{
        height: 40px;
        line-height: 40px;
      }
    }
    .message{
      position: relative;
      left: 2%;
      width: 96%;
      height: 30px;
      line-height: 30px;
      color: red;
      font-size: 12px;
    }
    .label{
      position: relative;
      left: 2%;
      width: 96%;
      display: flex;
      label{
        flex: 1;
        color: rgb(12,108,237);
      }
    }
    .btn{
      position: relative;
      left: 2%;
      width: 96%;
      margin-top: 10px;
    }
  }
}
</style>
