<template>
  <a-card :title="poem.title" style="width: 800px; margin: 0 auto;background-color: #eee9d6" >

    <a style="color: black" @click="getAuthorDetail(poem?.authorName)"><a-avatar :src="poem.avatarUrl" /> <span style="display: inline-block ;width: 10px"/>{{ poem.dynasty +' · '+ poem.authorName }}</a>
    <a-card title="内容" :style="{ marginTop: '10px' }">
      <div v-html="poem.content.replace(/。/g, '。<br>')"/>
    </a-card>
    <a-card title="注释" :style="{ marginTop: '16px' }">
      {{poem.translation}}
    </a-card>
    <a-card title="赏析" :style="{ marginTop: '16px' }">
      {{poem.appreciation}}
    </a-card>
  </a-card>

</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {useRoute} from "vue-router";
  import myAxios from "../plugins/myAxios.ts";
  const route = useRoute()
  const poem = ref<Poem>();
  const poemDetail = ref({
    title:route.query.title,
  })
  console.log(poemDetail.value.title)
  const getDetail = async (title:string) =>{
    myAxios.get('/poem/get?title='+title).then(res=>{
      poem.value = res;
      console.log(poem.value)
    })
  }
  getDetail(poemDetail.value.title)

  const getAuthorDetail = (authorName:string)=>{
    window.open(`/author/detail?authorName=${encodeURIComponent(authorName)}`, '_blank');
  }
</script>

<style scoped>

</style>