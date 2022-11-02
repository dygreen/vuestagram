/* Vuex
state 수정하고 싶으면
1. 미리 store.js에 수정방법을 정의해두고
2. 그 방법을 컴포넌트에서 소환해서 수정해야 함
*/

import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
  state () {
    return {
      name : 'kim',
      age : 20,
      likes : 30,
      control : true,
      more : {},
    }
  },
  mutations : { // state 수정방법 정의하는 곳
    setMore(state, data){
      state.more = data
    },
    likesControl(state){
      if (state.control) {
        state.likes++
        state.control = false
      } else {
        state.likes--
        state.control = true
      }
    },
    addAge(state, payload){
      state.age += payload
    },
    changeName(state){
      state.name = 'park'
    }
  },
  actions : { // ajax 또는 오래걸리는 작업들 시행하는 곳
    getData(context){ // actions에 추가한 파라미터는 대충 $store를 뜻함
      axios.get('https://codingapple1.github.io/vue/more0.json')
        .then((a) => {
          console.log(a.data)
          context.commit('setMore', a.data)
      })
    }
  },
})

export default store;