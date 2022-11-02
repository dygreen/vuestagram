<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tab === 1" @click="tab++">Next</li>
      <li v-if="tab === 2" @click="publish">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- Vuex -->
  <h4>안녕 {{ $store.state.name }} {{ $store.state.age }}</h4>
  <button @click="$store.commit('changeName')">버튼</button>
  <button @click="$store.commit('addAge', 10)">나이증가</button>

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button>

  <Container :feeds="feeds" :tab="tab" :url="url" :filterName="filterName" @writing="write = $event"/>
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input  @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>
import Container from './components/Container'
import feeds from './assets/feeds'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data(){
    return {
      feeds: feeds,
      count: 0,
      tab: 0,
      url: '',
      write: '',
      filterName : ''
    }
  },
  mounted() {
    this.emitter.on('btnClick', (a) => {
      this.filterName = a
    });
  },
  components: {
    Container,
  },
  computed : { // 일종의 '계산결과 저장공간'
    now2(){
      return this.$store.state.name
    },
    ...mapState(['name', 'age', 'likes']),
    // ...mapState({ 내이름 : 'name' }),
    ...mapMutations(['setMore', 'likesControl'])
  },
  methods: {
    more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`).then( result => {
        this.feeds.push(result.data)
        this.count++
      })
    },
    upload(e){
      let file = e.target.files
      console.log(file)
      this.url = URL.createObjectURL(file[0])
      console.log(this.url) // blob:http://localhost:8080/505896e1-8f28-48fb-b29c-d3addd21af09 -> blob? binary 데이터(0과 1로 이루어진)를 다룰 때 BLOB이라는 object에 담아서 다룸
      this.tab++
    },
    publish(){
      let myPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.url,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.write,
        filter: this.filterName
      }
      this.feeds.unshift(myPost)
      this.tab = 0
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
