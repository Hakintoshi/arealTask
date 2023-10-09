<script setup lang="ts">
import { ref } from 'vue'

import axios from 'axios'


const textSecret = ref()
const linkOnSecret = ref()
const textError = ref(false)

const saveSecret = () => {
  if(!textSecret.value) {
    textError.value = true
    linkOnSecret.value = null
    return;
  }
  axios({
    method: "post",
    url: "http://localhost:3000/",
    data: {
      secret: textSecret.value
    }
  }).then((res) => linkOnSecret.value = res.data)
  textSecret.value = ""
  textError.value = false
}


</script>

<template>
  <div class="wrapper">
    <h1>Secret</h1>
    
    <div class="servis">
      <div v-if="textError" class="servis__error">
        <p >Сначала введите текст</p>
        <button class="servis__error-close" @click="textError=false">Закрыть</button>
      </div>
      
      <div class="main">
        <textarea v-model="textSecret" class="main__textarea"></textarea>
        <button @click="saveSecret" class="main__button">Сохранить</button>
      </div>
      <div class="link">
        <p class="link__text">Ссылка на зашифрованное сообщение:</p>
        <a v-if="linkOnSecret" :href=linkOnSecret>{{ linkOnSecret }}</a>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}

.servis {
  margin-top: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  width: 500px;
  height: 300px;
  background-color: rgb(96, 96, 248);
  padding: 10px;
}

.servis__error {
  position: relative;
  margin-bottom: 5px;
  background-color: rgb(188, 215, 239);
  width: 100%;
  height: 50px;
  padding: 10px 10px 10px 20px;
  border-radius: 10px;
  color: rgb(6, 42, 248);
}

.servis__error-close {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 10px, 15px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(188, 215, 239);
  transition: 0.3s;
}

.servis__error-close:hover {
  background-color: rgb(188, 215, 239);
  border: 2px solid rgb(255, 255, 255);
  color: rgb(6, 42, 248);
}
.main {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.main__textarea {
  width: 250px;
  height: 100px;
  resize: none;
  
}

.main__button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px solid rgb(96, 96, 248);
  transition: 0.3s;
}

.main__button:hover {
  background-color: rgb(188, 215, 239);
  border: 2px solid rgb(255, 255, 255);
  color: rgb(96, 96, 248);
}

.link { 
  background-color: white;
  width: 100%;
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 10px;
}
</style>
