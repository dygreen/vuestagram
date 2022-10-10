<template>
  <div>
    <Post :feeds="a" v-for="(a,i) in feeds" :key="i"/>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  components: {
    Post,
  },
  props: {
    feeds : Array,
  },
}
</script>

<style>

</style>