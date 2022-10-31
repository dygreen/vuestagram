/* Vuex
state 수정하고 싶으면
1. 미리 store.js에 수정방법을 정의해두고
2. 그 방법을 컴포넌트에서 소환해서 수정해야 함
*/

import { createStore } from "vuex";

const store = createStore({
  state () {
    return {
      name : 'kim',
      age : 20,
      likes : 30,
    }
  },
  mutations : { // state 수정방법 정의하는 곳
    addAge(state, payload){
      state.age += payload
    },
    changeName(state){
      state.name = 'park'
    },
    likesControl(state){
      let count = 0;
      if (count === 0) {
        state.likes++
        count++
        console.log(count)
      } else if (count === 1) {
        state.likes--
      }
    }
  }
})

export default store;