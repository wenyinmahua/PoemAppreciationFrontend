<template >
  <div class="bg">
    <div v-if="authors.length > 0">
    <a-comment  v-for="(author, index) in authors" >
      <template #actions>
      <span key="comment-basic-like">
        <a-tooltip>
          <template v-if="author.liked">
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

          {{ author.likes }}
        </span>
      </span>

        <span key="comment-basic-reply-to" @click="console.log(111)">查看评论</span>
        <div class="align-right" @click="speakTitle(author.name +'。' +'。'+author.dynasty+'。'+author.bio)"><img width="25px" src="https://ziyuan.guwendao.net/siteimg/yin-pic.png"/></div>

      </template>
      <template #author><a @click="getAuthorDetail(author.name)">{{author.name}}</a></template>
      <template #avatar>
        <a-avatar :src="author.avatarUrl" alt="{{author.name}}" />
      </template>

      <template #content>
        <p>

          <div class="poem-content" v-html="formatPoemContent(author.bio)"></div>
        </p>
      </template>
      <template #datetime>
        <a-tooltip >
          <a @click="console.log(author.dynasty)">{{ author.dynasty }}</a>
        </a-tooltip>
      </template>

      <hr style="border-top-color: #eee9d6;"/>
    </a-comment>

    <a-pagination  :total="total" pageSize="3" @change="change" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { HeartTwoTone} from '@ant-design/icons-vue';
import { ref} from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import myAxios from "../plugins/myAxios.ts";
import { Empty } from 'ant-design-vue';

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
dayjs.extend(relativeTime);
const current = ref(1);
const pageSize = ref(3);
const total = ref<number>(0)
const speakTitle = (text:string) => {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.75;
  speechSynthesis.speak(utterance);
}
const like = (index: number) => {
  const updatedPoems = authors.value.map((poem, i) => {
    if (i === index) {
      myAxios.get('/user/like/author?id='+poem.id+'&isLike=' + !poem.liked);
      return { ...poem,
        likes: poem.likes = poem.liked? --poem.likes  :  ++poem.likes,
        liked: poem.liked = !poem.liked,
      };
    }
    return poem;
  });

  authors.value = updatedPoems;
};

const authors = ref<Author[]>([]);

const getAuthor = (current:number, pageSize:number)=> myAxios.get("/user/liked/author",{params:{
    current:current,
    pageSize : pageSize,
  }}).then((res)=>{
  if(res){
    //@ts-ignore
    authors.value = res.records;
    //@ts-ignore
    total.value = res.total;
    console.log(total.value)
  }
})
getAuthor(current.value,pageSize.value)
const change = (current:number,pageSize:number) => {
  getAuthor(current,pageSize);
  window.scrollTo({
    top: 1400,
    behavior: 'smooth', // 平滑滚动
  });
}

// 假设古诗内容中可能含有换行符，此方法用于处理换行符为HTML的<br>标签
const formatPoemContent = (content:string) => {
  return content.replace(/。/g, '。<br>');
}

const getAuthorDetail = (authorName:string)=>{
  window.open(`/author/detail?authorName=${encodeURIComponent(authorName)}`, '_blank');
}


import { CaretRightOutlined } from '@ant-design/icons-vue';

const activeKey = ref(['1']);
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';


</script>
<style>
.poem-title {
  font-size: 24px;
  margin-bottom: 16px;
}

</style>