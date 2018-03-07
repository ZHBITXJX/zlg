<template>
    <div class='storeInput'>
      <div class='div-inp'>
        <label for='number'>
          <span>库房编号:</span>
          <input class="form-control form-input"  type="text" name='number' id='number'  v-model=currentdatanumber />
        </label>
      </div>
      <div class='div-inp'>
        <label for='name'>
          <span>库房名称:</span>
          <input class="form-control form-input" type="text" name='name' id='name' v-model=currentdataname />
        </label>
      </div>
      <div class='div-inp'>
        <label for='location'>
          <span>库房位置:</span>
          <input class="form-control form-input" type="text" name='location' id='location'  v-model=currentdatalocation />
        </label>
      </div>
      <div class='div-inp'>
        <label for='username'>
          <span>登录账号:</span>
          <input class="form-control form-input" type="text" name='username' id='username' v-model=currentdatausername />
        </label>
      </div>
      <div class='div-inp'>
        <label for='password'>
          <span>登录密码:</span>
          <input class="form-control form-input" type="text" name='password' id='password' v-model=currentdatapassword />
        </label>
      </div>
      <div class='div-inp'>
      <label for='managementnumber'>
      <span>管理员工号:</span>
      <input class="form-control form-input" type="text" name='managementnumber' id='managementnumber'  :value= currentdatamanagementnumber />
      </label>
      </div>
      <!--<div class='div-inp'>-->
        <!--<label for='AdministratorName'>-->
          <!--<span>管理员姓名:</span>-->
          <!--<input class="form-control form-input" type="text" name='AdministratorName' id='AdministratorName'  v-model='AdministratorName'/>-->
        <!--</label>-->
      <!--</div>-->
      <!--<div class='div-inp'>-->
        <!--<label for='AdministratorPhone'>-->
          <!--<span>管理员手机:</span>-->
          <!--<input class="form-control form-input" type="text" name='AdministratorPhone' id='AdministratorPhone' v-model='AdministratorPhone'/>-->
        <!--</label>-->
      <!--</div>-->
      <input type="button" class="btn btn-primary btn-submit" value="提交" @click='submit'>
    </div>
</template>
<script>
  import {mapMutations} from 'vuex'

  export default{
    props: {
      currentdatanumber: {type: String},
      currentdataname: {type: String},
      currentdatalocation: {type: String},
      currentdatausername: {type: String},
      currentdatapassword: {type: String},
      currentdatamanagementnumber: {type: String}

    },
    data () {
      return {
//        currentdata: {
//          id: '',
//          number: '1',
//          name: '',
//          location: '',
//          username: '',
//          password: '',
//          managementnumber: ''
//        }
      }
    },
    created: function () {

    },
    computed: {
//      ...mapGetters([
//        'storageInput',
//      ])
    },
    methods: {
      ...mapMutations(['SHOW_MESSAGE']),
      async submit () {
        const result = await this.$http.post('http://localhost:3030/Storage/addStorage', {
          number: this.currentdata.number,
          name: this.currentdata.name,
          location: this.currentdata.location,
          username: this.currentdata.username,
          password: this.currentdata.password,
          managementnumber: this.currentdata.managementnumber
        })
        console.log(result)
        this.show = false
        this.SHOW_MESSAGE(this.show)
        this.$router.push('/refresh')
      }
    },
    watch: {
    }
  }
</script>

<style lang='less' scoped>
  .storeInput{
    .div-inp{
      height: 50px;
      label{
        span{
          position: absolute;
          width: 100px;
        }
        .form-control {
          position: absolute;
          margin-left: 100px;
          width: 250px;
          height: 30px;
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
</style>
