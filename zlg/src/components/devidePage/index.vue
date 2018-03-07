<template>
    <div>
      <ul class='mo-paging'>
        <li :class="['paging-item','paging-item--prev', {'paging-item--disabled' : index === 1}]" @click="prev"><<</li>
        <li :class="['paging-item','paging-item--first', {'paging-item--disabled' : index === 1}]" @click="first">first</li>
        <li :class="['paging-item','paging-item--more']" v-if="showPrevMore">...</li>
        <li  v-for="(item,index) in pageArr" @click="go(item.page)" :class="['paging-item',{'active1':item.active === true}]">{{item.page}}</li>
        <li :class="['paging-item','paging-item--more']" v-if="showNextMore">...</li>
        <li :class="['paging-item','paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">last</li>
        <li :class="['paging-item','paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">>> </li>
      </ul>
    </div>
</template>
<script>
  export default{
    props: {
      perPages: {
        type: Number,
        default: 1
      },
      pageIndex: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: this.pageIndex,
        limit: this.pageSize,
        size: this.total,
        showPrevMore: false,
        showNextMore: false,
        pageArr: []
      }
    },
    created () {
      this.$nextTick(function () {
        this.pagec()
      })
    },
    computed: {
      pages () {
        this.pagec()
        return Math.ceil(this.size / this.limit)
      },
      pagers () {
        const array = []
        const perPages = this.perPages
        const pageCount = this.pages
        var current = this.index
        const _offset = (perPages - 1) / 2
        const offset = {
          start: current - _offset,
          end: current + _offset
        }
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount)
          offset.end = pageCount
        }
        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < pageCount)
        for (var i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }
        return array
      }
    },
    methods: {
      pagec () {
        this.pageArr = []
        for (var i = 0; i < Math.ceil(this.size / this.limit); i++) {
          var p = i + 1
          var obj1 = {active: true, page: p}
          var obj = {active: false, page: p}
          if (i === 0) {
            this.pageArr.push(obj1)
          } else {
            this.pageArr.push(obj)
          }
        }
        console.log('this.pageArr')
        console.log(this.pageArr)
      },
      prev () {
        if (this.index > 1) {
          this.go(this.index - 1)
        }
      },
      next () {
        if (this.index < this.pages) {
          this.go(this.index + 1)
        }
      },
      first () {
        if (this.index !== 1) {
          this.go(1)
        }
      },
      last () {
        if (this.index !== this.pages) {
          this.go(this.pages)
        }
      },
      go (page) {
        for (var i = 0; i < this.pageArr.length; i++) {
          if (page === i + 1) {
            this.pageArr[i].active = true
          } else {
            this.pageArr[i].active = false
          }
        }
        if (this.index !== page) {
          this.index = page
          this.$emit('change', this.index)
        }
      }
    },
    watch: {
      pageIndex (val) {
        this.index = val
      },
      pageSize (val) {
        this.limit = val
      },
      total (val) {
        this.size = val
      },
      pageArr (val) {
        this.pageArr = val
      }
    }
  }
</script>

<style lang='less' scoped>
  .mo-paging {
    display: inline-block;
    padding: 0;
    margin: 1rem 0;
    font-size: 0;
    list-style: none;
    .active1{
      background-color: #0275d8 !important;
      color: white !important;
    }
    .paging-item {
      display: inline;
      font-size: 14px;
      position: relative;
      padding: 6px 12px;
      line-height: 1.42857143;
      text-decoration: none;
      border: 1px solid gainsboro;
      /*border-radius: 3px;*/
      background-color: #fff;
      margin-left: -1px;
      cursor: pointer;
      color: #000;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        background-color: #0275d8;
        color: white;
      }
      &.paging-item--disabled,
      &.paging-item--more{
        background-color: #fff;
        color: #505050;
      }
      //禁用
      &.paging-item--disabled {
        cursor: not-allowed;
        opacity: .75;
      }
      &.paging-item--more,
      &.paging-item--current {
        cursor: default;
      }
      //选中
      &.paging-item--current {
        background-color: #0275d8;
        color:#fff;
        position: relative;
        z-index: 1;
        border-color: #0275d8;
      }
    }
  }
</style>
