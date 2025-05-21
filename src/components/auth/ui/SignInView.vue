<template>
  <v-form ref="form" @submit.prevent="submit" @keydown.enter="submit">
    <v-card class="auth-card">
      <v-card-title class="title-text">
        <div class="large-title-text">{{ "Войдите в систему" }}</div>
      </v-card-title>

      <v-divider>
        <v-btn
            class="small-text"
            text="Зарегистрироваться"
            variant="plain"
            rounded="xl"
            density="compact"
            @click="route('./signUp')"
        ></v-btn>
      </v-divider>

      <v-card-text class="input-fields">
        <v-text-field
            label="Email"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            type="email"
            clearable
            :maxlength="useConstStore().const.emailMaxLength"
            :v-model.trim="useAuthStore().email"
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
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :maxlength="useConstStore().const.passwordMaxLength"
            :v-model.trim="useAuthStore().password"
            :rules="[
                useConstStore().rules.required,
                useConstStore().rules.passwordMin,
                useConstStore().rules.passwordNumsAndLetrs,
                ]"
        ></v-text-field>

        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn
                density="default"
                variant="tonal"
                icon="$AuthGoogleIcon"
            ></v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
                density="default"
                variant="tonal"
                icon="$AuthGithubIcon"
            ></v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
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
            @click="route('./signUp')"
        ></v-btn>
      </v-divider>

      <v-card-actions>
        <v-btn
            rounded="xl"
            class="flex-grow-1"
            variant="tonal"
            text="Войти"
            @click="submit"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import {useConstStore} from "@/stores/const.js";
import {useAuthStore} from "@/components/auth/js/authStore.js";
import router from "@/router/index.js";
import ExceptionTooltip from "@/components/app/ex/ExceptionTooltip.vue";
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";
import ExceptionSnackbar from "@/components/app/ex/ExceptionSnackbar.vue";

export default {
  name: "SignInView",
  components: {ExceptionSnackbar, ExceptionTooltip},
  data() {
    return {
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    useConstStore,
    useAuthStore,
    submit() {
      useExcStore().testException()
    },
    route(value){
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

.title-text
  padding-top: 30px
  padding-bottom: 20px
  text-align: center
  margin: 0 auto
  display: flex

</style>