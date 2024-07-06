<script  lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default {
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<template>
  <a-config-provider :locale="locale">
    <div class="app">
      <RouterView></RouterView>
    </div>
  </a-config-provider>


</template>

<style scoped>
.app{
  padding: 20px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>


