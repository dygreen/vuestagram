# vuestagram

> [22.10.10 ~ ] vue를 활용하여 인스타그램 앱 제작
>
>

***
## 주요 기능
* 게시물 더보기 버튼
* 이미지 파일 업로드 및 글 발행 기능


## Details
* 피드 데이터 바인딩: `v-for`, style="{ backgroundImage : `url(${feeds.postImage})` }"
* 부모 -> 자식 -> 자식의 자식 props 전달
* 더보기 버튼: ajax 요청으로 게시물 데이터 받아 보여주기
* 탭 기능
```javascript
<div v-if="tab === 0">내용0</div>
<div v-if="tab === 1">내용1</div>
<div v-if="tab === 2">내용2</div>
<button @click="tab = 0">버튼0</button>
<button @click="tab = 1">버튼1</button>
<button @click="tab = 2">버튼2</button>
```
* `URL.createObjectURL()`로 서버 없이 업로드한 이미지 삽입하기
* 이미지 업로드하기
```javascript
upload(e){
  let file = e.target.files
  console.log(file)
  this.url = URL.createObjectURL(file[0])
  console.log(this.url) // blob:http://localhost:8080/505896e1-8f28-48fb-b29c-d3addd21af09 -> blob? binary 데이터(0과 1로 이루어진)를 다룰 때 BLOB이라는 object에 담아서 다룸
  this.tab++
}
```
* 게시글 발행하기
```javascript
publish(){
  let myPost = {
    name: "Kim Hyun",
    userImage: "https://placeimg.com/100/100/arch",
    postImage: this.url,
    likes: 36,
    date: "May 15",
    liked: false,
    content: this.write,
    filter: "perpetua"
  }
  this.feeds.unshift(myPost)
  this.tab = 0
}
```
* `<slot></slot>`으로 props 전송 없이 부모-자식 간 데이터 사용하기