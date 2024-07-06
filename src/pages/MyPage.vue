<template>
  <a-form
    v-if="loginUser == null"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-card  style="width: 500px; margin: 50px auto;background-color: #f0efe2 ">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="登录">
          <a-form-item
              label="用户账号"
              name="userAccount"
              :rules="[{ required: true, message: '请输入用户账号' }]"
          >
            <a-input v-model:value="formState.userAccount" />
          </a-form-item>

          <a-form-item
              label="密码"
              name="userPassword"
              :rules="[{ required: true, message: '请输入用户密码' }]"
          >
            <a-input-password v-model:value="formState.userPassword" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
              <a-form-item
                  label="用户账号"
                  name="userAccount"
                  :rules="[{ required: true, message: '请输入用户账号' }]"
              >
                <a-input v-model:value="formState.userAccount" />
              </a-form-item>

              <a-form-item
                  label="密码"
                  name="userPassword"
                  :rules="[{ required: true, message: '请输入用户密码' }]"
              >
                <a-input-password v-model:value="formState.userPassword" />
              </a-form-item>

          <a-form-item
              label="确认密码"
              name="checkPassword"
              :rules="[{ required: formState.userPassword === formState.checkPassword, message: '确认密码要和原密码相同' }]"
          >
            <a-input-password v-model:value="formState.checkPassword" />
          </a-form-item>

              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">登录</a-button>
              </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-form>
  <template v-else>
    <a-card style="width: 900px; margin: 50px auto;background-color: #f0efe2">
        <a-descriptions title="个人信息" bordered>
          <template #extra>
            <a-button  @click="showModal">编辑</a-button>
          </template>
          <a-descriptions-item label="用户姓名">{{loginUser.username}}</a-descriptions-item>
          <a-descriptions-item label="用户账号">{{loginUser.userAccount}}</a-descriptions-item>
          <br/>

          <a-descriptions-item label="个人简介">{{loginUser.profile}}</a-descriptions-item>
        </a-descriptions>
      <a-button type="primary" @click="logout">退出登录</a-button>

    </a-card>
    <a-card style="width: 900px; margin: 50px auto;background-color: #f0efe2" title="收藏的古诗">
      <CollectPoemList/>
    </a-card>
    <a-card style="width: 900px; margin: 50px auto;background-color: #f0efe2" title="收藏的诗人">
      <CollectAuthorList/>
    </a-card>

      <a-modal v-model:open="open" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
        <a-form-item label="用户姓名">
          <a-input v-model:value="loginUser.username" placeholder="请输入用户姓名" />
        </a-form-item>
        <a-form-item label="用户简介">
          <a-textarea :rows="4" v-model:value="loginUser.profile" placeholder="请输入用户简介" />
        </a-form-item>
      </a-modal>

  </template>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {message} from "ant-design-vue";
import router from "../router";
import CollectPoemList from "../components/CollectPoemList.vue";
import CollectAuthorList from "../components/CollectAuthorList.vue";
const loginUser = ref<User>();
myAxios.get('/user/get/login').then(res=>{
  //@ts-ignore
  loginUser.value = res;
})

const logout = () =>{
  myAxios.post("/user/logout").then(()=>{
    loginUser.value == null;
    location.reload();
  })
  message.success("退出登录成功")

}
interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
}
const activeKey = ref('1');

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword:'',
});
const onFinish = async (values: any) => {
  await myAxios.post("/user/login",{...values}).then(res=>{
    //@ts-ignore
    loginUser.value = res;
    if (res !== undefined){
      message.success("登录成功");
      router.replace('/')

    }
  })

};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  confirmLoading.value = true;
  myAxios.post('/user/update',{
    id:loginUser.value?.id,
    username:loginUser.value?.username,
    profile: loginUser.value?.profile
  });
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>

