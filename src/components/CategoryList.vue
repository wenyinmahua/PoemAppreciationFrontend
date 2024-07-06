<template>
  <div style="display: flex; justify-content: center; ">
    <a-input-search
        class="search-input"
        v-model:value="searchText"
        placeholder="请输入关键词 "
        style="width: 800px; margin-top: 30px"
        @search="onSearch"
    />

  </div>
    <a-tabs v-model:activeKey="activeKey" class="tap-title{">
      <a-tab-pane key="1" tab="古诗">古诗</a-tab-pane>
      <a-tab-pane key="2" tab="作者" force-render>作者</a-tab-pane>
      <a-tab-pane key="3" tab="好句">好句</a-tab-pane>
    </a-tabs>
</template>

<script setup lang="ts">
import {ref} from "vue";
const activeKey = ref('1');
const searchText = ref("");
const onSearch = (value: string) => {
  alert(value)
}

const poemList = ref<Poem []>([]);
const lineList  =ref<FamousLine []>( []);
const authorList = ref<Author []>([]);



// todo 古诗组件、作者组件、名句组件
</script>


<style scoped>
/* 自定义已激活标签的背景色 */
.tap-title{
  color: #5b5d44 !important;
  font-size: large;
}
/* 如果需要也可以调整激活状态下的文字颜色 */

</style>
