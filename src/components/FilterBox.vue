<template>
  <div :class="`${filter} filter-item`" :style="`background-image:url(${url})`"  @click="fire">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name : 'filterbox',
  methods : {
    fire(){
      /* mitt로 데이터 전송하는 법
       1. this.emitter.emit()으로 발사하고
       2. 수신하면 됨
      */
      this.emitter.emit('btnClick', this.filter)
    }
  },
  props : {
    url : String,
    filter : String,
  }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>