<template>
  <v-form ref="form" @submit.prevent="signIn" @keydown.enter="signIn">
    <v-card class="auth-card blur">
      <v-card-title class="auth-title-text">
        <div class="large-title-text">{{ "Войдите в систему" }}</div>
      </v-card-title>

      <v-divider>
        <v-btn
            class="small-text"
            text="Зарегистрироваться"
            variant="plain"
            rounded="xl"
            density="compact"
            @click="signUp"
        ></v-btn>
      </v-divider>

      <v-card-text class="input-fields">
        <v-text-field
            label="Email"
            ref="email"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            type="email"
            clearable
            :maxlength="useConstStore().const.emailMaxLength"
            v-model.trim="useAuthStore().email"
            :rules="[
                useConstStore().rules.required,
                useConstStore().rules.email
                 ]"
        ></v-text-field>
        <v-text-field
            label="Password"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            clearable
            autocomplete="on"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :maxlength="useConstStore().const.passwordMaxLength"
            v-model.trim="useAuthStore().password"
            :rules="[
                useConstStore().rules.required,
                useConstStore().rules.passwordMin,
                useConstStore().rules.passwordNumsAndLetrs,
                ]"
        ></v-text-field>

        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn
                class="scalable-btn"
                density="default"
                variant="tonal"
                icon="$AuthGoogleIcon"
            ></v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
                class="scalable-btn"
                density="default"
                variant="tonal"
                icon="$AuthGithubIcon"
            ></v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
                class="scalable-btn"
                density="default"
                variant="tonal"
                icon="$AuthTelegramIcon"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider>
        <v-btn
            class="small-text divider-btn"
            text="Восстановить пароль"
            variant="plain"
            rounded="xl"
            density="compact"
            @click="restore"
        ></v-btn>
      </v-divider>

      <v-card-actions>
        <v-btn
            rounded="xl"
            class="flex-grow-1"
            variant="tonal"
            text="Войти"
            :loading="isLoading"
            @click="signIn"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import {useConstStore} from "@/stores/const.js";
import {useAuthStore} from "@/components/auth/js/authStore.js";
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";
import router from "@/router/index.js";

export default {
  name: "SignInView",
  components: {},
  data() {
    return {
      routes: {
        signIn: './',
        signUp: './signUp',
        restore: './restore',
        home: './home'
      },

      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    useConstStore,
    useAuthStore,
    async signIn() {
      await this.$refs.form.validate().then(validation =>{
        if(validation.valid){
          this.isLoading = true
          useAuthStore().signIn().then(response => {
            if(response){
              this.route(this.routes.home)
              useAuthStore().clearStoreData()
            }
            this.isLoading = false
          })
        }
      })
    },
    async signUp() {
      this.route(this.routes.signUp)
    },
    async restore() {
      // await this.$refs.email.validate().then(validation =>{
      //   if(validation.length === 0){
      //     this.route(this.routes.restore)
      //   }
      // })
      this.route(this.routes.restore)
    },
    route(value) {
      router.push(value)
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.input-fields
  margin-top: 0

.divider-btn
  margin-top: 5px
  margin-bottom: 10px

</style>
