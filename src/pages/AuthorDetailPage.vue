<template>
  <a-card hoverable style="width: 500px; margin: 50px auto" >
    <template #cover>
      <img alt="example" :src="author.avatarUrl" />
    </template>
    <a-card-meta :title="author.name">
      <template #description>{{author.bio}}</template>
    </a-card-meta>
  </a-card>
</template>


<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";

const route = useRoute();
const authorName = ref(route.query.authorName)
const author = ref<Author>();
const getAuthorByName = (name:string) =>{
  myAxios.get("/author/get?name="+name).then(res=>{
    author.value = res;
  })
}
getAuthorByName(authorName.value);

</script>



<style scoped>

</style>