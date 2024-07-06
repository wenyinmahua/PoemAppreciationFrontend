<template>
  <div class="rounded-box">
    <div class="menu-container">
    <a-menu
        class="transparent-background"
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
    />
    </div>

    <div class="content">
      <component :is="currentComponent"></component>
    </div>
    <a-float-button
        shape="circle"
        type="default"
        :style="{ right: '94px'}"
        @click="stopSpeak()"
    >

      <template #icon>
        <a-space>
          <a-tooltip placement="topLeft" title="停止播放音频">
            <CustomerServiceOutlined />
          </a-tooltip>
        </a-space>
      </template>
    </a-float-button>
  </div>
</template>

<script lang="ts" setup>
import { CustomerServiceOutlined } from '@ant-design/icons-vue';


import FamousLinesList from "../components/FamousLinesList.vue";


import {computed, ref} from 'vue';
import { MenuProps } from 'ant-design-vue';
import PoemList from '../components/PoemList.vue';
import AuthorList from '../components/AuthorList.vue';
import MyPage from '../pages/MyPage.vue';
import CategoryList from "../components/CategoryList.vue";
const stopSpeak = () => {
  speechSynthesis.cancel();
}
const current = ref(['poems']); // 初始化选中的菜单项
const items = ref<MenuProps['items']>([
  {
    key: 'poems',
    label: '古诗推荐',
  },
  {
    key: 'authors',
    label: '作者列表',
  },
  { key: 'famousLinesList',
    label: '名句列表'
  },
  { key: 'categoryList',
    label: '分类查找'
  },
  { key: 'myPage',
    label: '我的'
  },
]);

// 定义一个映射关系，将菜单项的key映射到组件名
const componentMap = {
  poems: PoemList,
  authors: AuthorList,
  myPage: MyPage,
  famousLinesList:FamousLinesList,
  categoryList:CategoryList,
};

// 计算属性，根据current的值返回对应的组件
const currentComponent = computed(() => {
  //@ts-ignore
  return componentMap[current.value[0]] || null; // 如果找不到对应的组件，返回null或其他默认组件
});
</script>

<style scoped>
.menu-container {
  border-radius: 10px 10px 0 0  ; /* 你可以调整这个数值来改变圆角的大小 */
  padding-top: 30px;
  height: 120px;
  background-image: url('https://ziyuan.guwendao.net/siteimg/24jie/%e5%a4%8f%e8%87%b3.jpg');
  background-size: cover;
  background-position: center;

}
.transparent-background {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.49) !important;
}
.rounded-box {
  border-radius: 10px; /* 你可以调整这个数值来改变圆角的大小 */
}
.search-input {
  display: flex;
  justify-content: center; /* 居中对齐容器 */
  margin: 0 auto; /* 用于块级元素的水平居中 */
}
</style>
