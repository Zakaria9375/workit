<script setup>
	import sourceData from '@/Data/myData.json'
  import { store } from "@/store.js";
  import RegisterPage from "./RegisterPage.vue";
  import { FormKit } from "@formkit/vue";
  import PopUp from "@/components/popUp/PopUp.vue";
  import { ref, reactive } from "vue";
  import { useRouter } from 'vue-router'
	import LoginData from '@/components/loginPage/LoginData.vue';

  const isLogging = ref(false);
  const message = ref('');
  const router = useRouter();
  const registeredUsers = reactive(sourceData.users);
	const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
	}
  async function handleSubmit(data) {
		await new Promise((r) => setTimeout(r, 1000))
    const matchingUser = registeredUsers.find((user) => user.email === data.email)
    if (matchingUser) {
      if (matchingUser.password === data.password) {
        store.isAuthenticated = true
        router.push('/protected');
      } else {
        isLogging.value = true
        message.value = 'Invalid Password'
      }
    } else {
      isLogging.value = true
      message.value = 'User not registered';
    }
  }
</script>
<template>
  <div class="loginPage p-tb">
    <div class="xcontainer">
      <div class="titleContainer">
        <h1>facebook</h1>
				<span @click="store.togglePopUp2" class="dataInfo"><i class="fa-regular fa-circle-question"></i></span>
        <h2>{{ $t("fb") }}</h2>
      </div>
      <div class="formContainer">
        <FormKit
          type="form"
          @submit="handleSubmit"
          :submit-label="$t('logIn')"
          method="post"
        >
          <FormKit
            type="email"
            name="email"
            :placeholder="$t('phEmail')"
            validation="required"
            prefix-icon="avatarMan"
          />
          <FormKit
            type="password"
            name="password"
            :placeholder="$t('phPassword')"
            validation="required"
            prefix-icon="password"
						suffix-icon="eyeClosed"
						@suffix-icon-click="handleIconClick"
          />
        </FormKit>
        <a href="#" class="forget">{{ $t("forgetpassword") }}</a>
        <div class="btnC">
          <a class="create" role="button" @click="store.togglePopUp"
            >{{ $t("cna") }}</a
          >
        </div>
        <div v-if="isLogging" class="success">
          <h2>
            {{ message }}
          </h2>
        </div>
      </div>
      
    </div>
  </div>
  <PopUp v-if="store.openPopUp" >
        <RegisterPage/>
      </PopUp>
			<PopUp v-if="store.openPopUp2" >
        <LoginData/>
      </PopUp>
</template>
<style scoped lang="scss">
@import "@/assets/css/main.scss";

.loginPage {
  min-height: calc(100dvh - 124px);
  overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
  .xcontainer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
    @include mScreen {
      flex-direction: column;
      justify-content: center;
    }
    .titleContainer {
      max-width: 600px;
      position: relative;
      
      @include mScreen {
        padding: 16px;
        text-align: center;
      }
      
      h1 {
        font-size: 4rem;
        color: #1877f2;
        letter-spacing: -2px;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      .dataInfo {
        position: absolute;
        top: 0;
        left: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        @include mScreen {
          left: 80%;
        }
      }
      h2 {
        @include fontz( 2, 500, t1)
      }
    }
  }
  .formContainer {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 32px;
    @include mobile {
      padding: 16px;
    }
    background-color: getColor(bg1);
    box-shadow: getColor(bs);
    border-radius: 8px;
    border: none;
    flex-shrink: 0;
  }
  .forget {
    text-decoration: none;
    color: getColor(t3);
    text-align: center;
    display: block;
    padding: 4px 6px 16px;
    margin-top: 6px;
    margin-bottom: 6px;
    border-bottom: 1px solid getColor(d1);
  }
  .btnC {
    padding-top: 16px;
    text-align: center;
  }
  .create {
    background-color: #42b72a;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    line-height: 48px;
    cursor: pointer;
    color: #fff;
  }
  .success {
    text-align: center;
    padding: 16px;
    h2 {
      @include fontoo(1.2, 400, t3)
    }
  }
}
</style>
