<template>
  <div class="bg">

  <a-list item-layout="vertical" size="large" v-for="(item,index) in authorList" >


      <a-list-item key="item.id">

        <a-list-item-meta >
          <template #title>
            <div class="title-container">
              <a @click="getDetail(item.name)">{{ item.name }}</a>

              <div class="align-right" @click="speakTitle(item.bio)"><img width="25px" src="https://ziyuan.guwendao.net/siteimg/yin-pic.png"/></div>
              <span style="display: inline-block;margin-left: 10px">
                  <a-tooltip>
                    <template v-if="item.liked">
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
                    {{ item.likes }}
                  </span>
                </span>
            </div>
          </template>

          <template #avatar><a-avatar :src="item.avatarUrl"  :style="{ transform: `scale(1.5)`}" /></template>
        </a-list-item-meta>
        {{ item.bio }}
        <hr/>
      </a-list-item>
  </a-list>
    <a-pagination  :total="total" @change="change" />
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {HeartTwoTone} from "@ant-design/icons-vue";
import myAxios from "../plugins/myAxios.ts";
const current = ref(1);
const pageSize = ref(8);
const authorList = ref<Author[]>([]);
const total = ref<number>(0);
const getAuthors= (current: number, pageSize: number) => myAxios.get("/author/page?current="+current+"&pageSize="+pageSize,{
  params:{
    current:current,
    pageSize:pageSize,
  }
}).then(res=>{
  //@ts-ignore
  authorList.value = res.records;
  //@ts-ignore
  total.value = res.total;
  console.log(total.value)
})
getAuthors(current.value,pageSize.value);

const speakTitle = (text:string) => {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.75;
  speechSynthesis.speak(utterance);
}
const change = (current:number,pageSize:number) => {
  console.log(current)
  console.log(pageSize)
  getAuthors(current,pageSize);
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滚动
  });
}

const like = (index: number) => {
  const updatedAuthorList = authorList.value.map((author, i) => {
    if (i === index) {
      myAxios.get('/user/like/author?id='+author.id+'&isLike=' + !author.liked);
      return { ...author,
        likes: author.likes = author.liked? --author.likes  :  ++author.likes,
        liked: author.liked = !author.liked,
      };

    }
    return author;
  });

  authorList.value = updatedAuthorList;
};

const getDetail = (authorName:string)=>{
  window.open(`/author/detail?authorName=${encodeURIComponent(authorName)}`, '_blank');
}


</script>

<style>
.title-container {
  display: flex; /* 将容器设置为Flex布局 */
  justify-content: space-between; /* 在两端对齐子元素，如果只需要按钮在最右，可以使用 'flex-end' */
}

.align-right {
  margin-left: auto; /* 这使得按钮在空间上尽可能向左推，从而实际上将其对齐到右侧 */
}
</style>

