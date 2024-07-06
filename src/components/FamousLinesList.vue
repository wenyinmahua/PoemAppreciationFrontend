

<template>
<a-card title="名句列表"  style="background-color: #f0efe2">
  <a-list size="middle"  :grid="{ gutter: 16, column: 3 }"  :data-source="FamousLines" >
    <template #renderItem="{ item }">
      <a-list-item >
        <a-card style="background-color: #eee9d6">
          <template #title>
            <a style="color: black" @click="getDetail(item.title)">{{ '《' + item.title + '》' }}</a>
          </template>
          {{item.content}}
          <div class="align-right" @click="speakTitle( item.content)"><img width="25px" src="https://ziyuan.guwendao.net/siteimg/yin-pic.png"/></div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</a-card>
</template>

<style scoped>

</style>

<script lang="ts" setup>

import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";

const FamousLines = ref<FamousLine []>([]);
const current = ref<number>(1);
const pageSize = ref<number>(9);
const total = ref<number>(0);

const getDetail = (title:string)=>{
  console.log(title)
  window.open(`/poem/detail?title=${encodeURIComponent(title)}`, '_blank');
}


const getFamousLines=(current:number,pageSize:number) =>{
  myAxios.get("/famousLines/page?current="+current+"&pageSize="+pageSize)
    .then(res=>{
      //@ts-ignore
      FamousLines.value = res.records;
      //@ts-ignore
      total.value = res.total;
      console.log(total.value)
    });
}
getFamousLines(current.value,pageSize.value)
const speakTitle = (text:string) => {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.75;
  speechSynthesis.speak(utterance);
}

</script>