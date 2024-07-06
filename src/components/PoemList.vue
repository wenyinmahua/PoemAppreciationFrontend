<template >
  <div class="bg">
    <a-comment v-for="(poem, index) in poems">
      <template #actions>
      <span key="comment-basic-like">
        <a-tooltip>
          <template v-if="poem.liked">
            <a-space @click="like(index)">
                <heart-two-tone two-tone-color="#eb2f96" />
            </a-space>

          </template>
          <template v-else>
            <a-space  @click="like(index)">
                <heart-two-tone two-tone-color="#838075" />
            </a-space>
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ poem.likes }}
        </span>
      </span>

        <span key="comment-basic-reply-to" @click="console.log(111)">查看评论</span>
        <div class="align-right" @click="speakTitle(poem.title +'。' +'。'+poem.dynasty+'。'+poem.authorName+'。'+ poem.content)"><img width="25px" src="https://ziyuan.guwendao.net/siteimg/yin-pic.png"/></div>


      </template>
      <template #author><a @click="getAuthorDetail(poem.authorName)">{{poem.authorName}}</a></template>
      <template #avatar>
        <a-avatar :src="poem.avatarUrl" alt="{{poem.authorName}}" />
      </template>
      <template #content>
        <p>

          <h1 class="poem-title" @click="getDetail(poem.title)"><a style="color:#000;">《{{ poem.title }}》</a></h1>
          <div class="poem-content" v-html="formatPoemContent(poem.content)"></div>
          <a-tag :bordered="false" color="warning">{{poem.category}}</a-tag>
        </p>
      </template>
      <template #datetime>
        <a-tooltip >
          {{ poem.dynasty }}
        </a-tooltip>
      </template>

      <hr style="border-top-color: #eee9d6;"/>

    </a-comment>
    <a-pagination  :total="total" @change="change" />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { HeartTwoTone} from '@ant-design/icons-vue';
import { ref} from 'vue';
//@ts-ignore
import relativeTime from 'dayjs/plugin/relativeTime';
import myAxios from "../plugins/myAxios.ts";
import MyAxios from "../plugins/myAxios.ts";
dayjs.extend(relativeTime);
const current = ref(1);
const pageSize = ref(8);

const speakTitle = (text:string) => {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.75;
  speechSynthesis.speak(utterance);
}
const like = (index: number) => {
  const updatedPoems = poems.value.map((poem, i) => {
    if (i === index) {
      MyAxios.get('/poem/like?id='+poem.id+'&isLike=' + !poem.liked);
      return { ...poem,
        likes: poem.likes = poem.liked? --poem.likes  :  ++poem.likes,
        liked: poem.liked = !poem.liked,
      };

    }
    return poem;
  });

  poems.value = updatedPoems;
};

const poems = ref<Poem[]>([]);
const total = ref<number>(0)
const getPoem = (current:number,pageSize:number)=> myAxios.get("/poem/page",{params:{
    current:current,
    pageSize : pageSize,
  }}).then((res)=>{
  if(res){
    //@ts-ignore
    poems.value = res.records;
    //@ts-ignore
    total.value = res.total;
  }
})
getPoem(current.value,pageSize.value)
const change = (current:number,pageSize:number) => {
  getPoem(current,pageSize);
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滚动
  });
}


const getDetail = (title:string)=>{
  window.open(`/poem/detail?title=${encodeURIComponent(title)}`, '_blank');
}

const getAuthorDetail = (authorName:string)=>{
  window.open(`/author/detail?authorName=${encodeURIComponent(authorName)}`, '_blank');
}
// 假设古诗内容中可能含有换行符，此方法用于处理换行符为HTML的<br>标签
const formatPoemContent = (content:string) => {
  return content.replace(/。/g, '。<br>');
}

</script>
<style>
.poem-title {
  font-size: 24px;
  margin-bottom: 16px;
}

</style>