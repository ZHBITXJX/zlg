<template>
    <div >
    <div class='bg'>
    </div>
    <div class="container">
      <input type="text" name='id' v-model=id hidden>
      <input type="text" name='userId' v-model=userId hidden>
      <input type="text" name='status' v-model=status hidden>
      <img :src= src alt="">
      <span @click='closes()'>&times;</span>
      <div class="name">{{name}}</div>
      <button @click='returns()'>归还</button>
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
      id: {
        type: Number
      }
    },
    data () {
      return {
        lend: true
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
      ...mapMutations(['SET_RETURNIMG']),
      closes () {
        this.SET_RETURNIMG(false)
      },
      async returns () {
        alert('return')
        var formdata = new FormData()
        formdata.append('id', this.id)
        formdata.append('userId', this.userId)
        formdata.append('status', true)
        const result = await this.$http.post('http://localhost:3030/Material/materialC', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$emit('change')
        this.closes()
        console.log(result)
      }
    }
  }
</script>

<style lang='less' scoped>
.bg{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
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
</style>
