<template>
    <div>
    <div class='bg'>
      <input type="text" name='id' hidden>
      <input type="text" name='userId' hidden>
      <input type="text" name='status' hidden>
    </div>
    <div class="container">
      <img :src=src alt="">
      <span @click='closes()'>&times;</span>
      <div class="name">{{name}}</div>
      <button v-if='status' @click='lends()'>借用</button>
      <button v-else class='disable' disabled>不可借用</button>
    </div>
    </div>
</template>
<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    props: {
      pic: {
        type: String
      },
      name: {
        type: String
      },
      status: {
        type: Boolean
      },
      index: {
        type: Number
      },
      id: {
        type: Number
      }
    },
    data () {
      return {
        lend: true,
        borrowTime: '',
        returnTime: '',
        start: ''
      }
    },
    computed: {
      ...mapGetters([
        'userId'
      ]),
      src () {
        return '/server/' + this.pic.split('/').join('')
      }
    },
    methods: {
      ...mapMutations(['SET_IMG']),
      closes () {
        this.SET_IMG(false)
      },
      async lends () {
        var formdata = new FormData()
        formdata.append('id', this.id)
        formdata.append('userId', this.userId)
        formdata.append('status', false)
        const result = await this.$http.post('http://localhost:3030/Material/materialC', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$emit('change')
        this.closes()
        console.log(result)
      }
    },
    watch: {
    }
  }
</script>

<style lang='less' scoped>
.bg{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(40,55,68);
  opacity: 0.2;
}
.container{
  position: fixed;
  top: 25%;
  left: 10%;
  background: white;
  width: 80%;
  height: 50%;
  border-radius: 5px;
  span{
    position: absolute;
    right: 2%;
    font-size: 30px;
    color: #2db7f5;
  }
  img{
    position: absolute;
    left: 0;
    width: 100%;
    height: 70%;
  }
  .name{
    position: absolute;
    top: 73%;
    font-size: 20px;
    font-weight: 600;
  }
  button{
    position: absolute;
    height: 30px;
    width: 30%;
    border-radius: 25px;
    right: 5%;
    bottom: 2%;
    border: 0;
    background: #2db7f5;
    color: white;
  }
  .disable{
    position: absolute;
    height: 30px;
    width: 30%;
    border-radius: 25px;
    right: 5%;
    bottom: 2%;
    border: 0;
    background: grey;
    color: white;
    disable: disable
  }
}
.lendbox{
  position: fixed;
  top: 35%;
  left: 15%;
  background: gainsboro;
  width: 70%;
  height: 20%;
  border-radius: 5px;
  .closelend{
    position: absolute;
    right: 2%;
    font-size: 24px;
    color:black;
  }
  label{
    position: absolute;
    top: 15%;
    left: 2%;
    font-size: 16px;
    font-weight: bold;
  }
  .input{
    position: absolute;
    top: 40%;
    left: 2%;
    input{
      width: 45%;
    }
  }
  .button{
    position: absolute;
    bottom: 5%;
    right: 2%;
  }
}
</style>
