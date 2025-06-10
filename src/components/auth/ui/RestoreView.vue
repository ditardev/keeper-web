<template>
  <v-form ref="form" @submit.prevent="restore" @keydown.enter="restore">
    <v-card class="auth-card">
      <v-card-title class="auth-title-text">
        <div class="large-title-text">{{ "Восстановление пароля" }}</div>
      </v-card-title>

      <v-divider>
        <v-btn
          class="small-text divider-btn"
          text="Войти"
          variant="plain"
          rounded="xl"
          density="compact"
          @click="route('./')"
        ></v-btn>
      </v-divider>

      <v-card-text>
        <p class="small-text info-text">На вашу электронную почту было отправлено письмо с кодом, необходимым для восстановления пароля. Введите данный код ниже и нажмите "проверить код".</p>
        <v-otp-input
          placeholder="#"
        ></v-otp-input>
        <v-btn
          rounded="xl"
          class="btn-validate-code"
          variant="text"
          text="Проверить код"
          @click="restore"
        ></v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          rounded="xl"
          class="flex-grow-1"
          variant="tonal"
          text="Восстановить"
          :disabled="!restoreApproved"
          @click="restore"
        />
      </v-card-actions>

    </v-card>
  </v-form>
</template>

<script>
import {useAuthStore} from "@/components/auth/js/authStore.js";
import router from "@/router/index.js";

export default {
  name: "RestoreView",
  data() {
    return {
      showPassword: false,
      isLoading: false,

      restoreApproved: false
    }
  },
  methods:{
    useAuthStore,
    restore(){
      this.restoreApproved = true
    },
    route(value){
      router.push(value)
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.info-text
  text-align: center

.btn-validate-code
  width: 100%
</style>
