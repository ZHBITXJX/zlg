<template>
  <div class='login'>
  <div class="bg-div"></div>
  <div class="signin">
    <img class="user-avater" src="../../assets/timg.jpg"/>
    <div class="box">
      <form class="signin-form" >
        <div class='div-inp'>
          <i class="iconfont icon-iconfontyonghuming i"></i>
          <input class="form-control form-input" placeholder="username" type="text" name='username' v-model='username'/>
          <div class='message' v-show= 'usermsg.length>0'>{{usermsg}}</div>
        </div>
        <div class="div-inp" style="margin: 20px 0;">
          <i class="iconfont icon-201 i"></i>
          <input class="form-control form-input" placeholder="password" type="password" name="password"  v-model='password'/>
          <div class='message' v-show='pwdmsg.length>0'>{{pwdmsg}}</div>
        </div>
        <div class="label">
        <label><input type="radio" name ="identity" v-model="identity" value="1"/>系统管理员</label>
        <label><input type="radio" name ="identity" v-model="identity" value="2"/>库房管理员</label>
        <label><input type="radio" name ="identity" v-model="identity" value="3"/>使用人</label>
        </div>
        <input type="button" class="btn btn-primary btn-submit" value="登录" @click='submit'>
      </form>
    </div>
  </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  export default{
    data () {
      return {
        username: '',
        password: '',
        identity: '系统管理员',
        usermsg: '',
        pwdmsg: '',
        logininentify: ''
      }
    },
    methods: {
      ...mapMutations(['SET_IDENTITY', 'SET_STROGEID', 'SET_USERID', 'SET_USER']),
      async submit () {
        if (this.usermsg.length === 0 && this.pwdmsg.length === 0) {
          const res = await this.$http.post('http://localhost:3030/login', {
            username: this.username,
            password: this.password,
            identity: this.identity
          })
          console.log(res.data)
          switch (res.data.backInfo) {
            case '0':
              alert('不存在该用户')
              break
            case '1':
              alert('login success')
              if (this.identity === '1') {
                this.logininentify = '系统管理员'
                this.SET_IDENTITY(this.logininentify)
                this.$router.push('/main')
              }
              if (this.identity === '2') {
                this.logininentify = '库房管理员'
                this.SET_IDENTITY(this.logininentify)
                this.$router.push('/main')
                this.SET_STROGEID(res.data.array[0].id)
              }
              if (this.identity === '3') {
                this.logininentify = '使用人'
                this.SET_IDENTITY(this.logininentify)
                this.SET_STROGEID(res.data.array[0].storageId)
                this.SET_USERID(res.data.array[0].id)
                this.SET_USER(res.data.array[0])
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
    watch: {
      username: function (val) {
        if (!val) {
          this.usermsg = '不能为空'
        } else if (!/^[^\d][\d\w]{5,9}$/.test(val)) {
          this.usermsg = '只能是数字字母下划线组合，不以数字开头，长度6-10'
        } else {
          this.usermsg = ''
        }
      },
      password: function (val) {
        if (!val) {
          this.pwdmsg = '不能为空'
        } else if (!/^[\d\w]{6}$/.test(val)) {
          this.pwdmsg = '不能为空，只能是数字字母下划线组合，长度6'
        } else {
          this.pwdmsg = ''
        }
      }
    }
  }
</script>
<style lang='less' scoped>
.login{
  .bg-div{
    background: url('../../assets/1.jpg') ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .signin{
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top:10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .user-avater{
      border-radius: 50%;
      border: 4px solid #fff;
      width: 50px;
      height: 50px;
    }
    .box {
      width: 400px;
      color: #666;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 100px;
      border-radius: 4px;
      border: 2px solid rgba(255,255,255, 0.2);
      border-top: 0;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 42px;
        height: 42px;
        position: absolute;
        top: -20px;
        left: 50%;
        margin-left: -19px;
        border-top-left-radius: 4px;
        border-left: 2px solid rgba(255,255,255, 0.3);
        border-top: 2px solid rgba(255,255,255, 0.3);
        transform: rotate(45deg);
        box-shadow: inset 1px 0 0 rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2);
      }
      &::before {
        content: '';
        display: block;
        width: 398px;
        height: 2px;
        position: absolute;
        /* margin: -199px 199px; */
        border-top-left-radius: 4px;
        /* transform: rotate(90deg); */
        box-shadow: inset 171px 0 0 0 rgba(255,255,255, 0.2), inset -171px 0 0 0 rgba(255,255,255, 0.2);
      }
      .signin-form{
        height: calc(100% - 40px);
        padding: 20px;
        label{
          color: rgb(12,108,237);
          margin-right: 15px;

        }
        .btn{
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
          border-radius: 0px;
          -webkit-user-select: none;
        }
        .btn-submit{
          width: 360px;
          height: 40px;
          background-color: #3B89F5;
          border-color: #3B89F5;
          margin-top: 20px;
        }
        .btn-submit:hover{
          color: #fff;
          background-color: #0C6CED;
          border-color: #0C6CED;
          text-decoration: none;
        }
        input::-webkit-input-placeholder {
          color: whitesmoke;
        }
        .div-inp{
          position: relative;
          .i{
            position: absolute;
            right: 5px;
            font-size: 24px;
            color:gainsboro;
          }
        }
        .form-control {
          display: block;
          width: 100%;
          height: 40px;
          padding: 6px 12px;
          font-size: 15px;
          line-height: 1.42857143;
          color: #fff;
          box-sizing: border-box;
        }
        .form-control:focus {
          border-color: rgba(59,137,245, 0.5);
          outline: 0;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(59,137,245, 0.6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(59,137,245, 0.6);
        }
        .form-input{
          background: rgba(214,222,206,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px rgba(255,255,255,0.2);
        }
      }
      .message{
        color:red;
      }
    }
  }
}
</style>



