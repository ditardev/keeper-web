<template>
  <v-form ref="form" @submit.prevent="submit" @keydown.enter="submit">
    <v-card class="auth-card">
      <v-card-title class="title-text">
        <div class="large-title-text">{{ "Регистрация" }}</div>
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
        <v-text-field
            label="Email"
            class="test"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            type="email"
            clearable
            :maxlength="50"
            :v-model.trim="useAuthStore().email"
            :rules="[useConstStore().rules.required, useConstStore().rules.email]"
        ></v-text-field>
        <v-text-field
            label="Password"
            class="test"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            clearable
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :maxlength="30"
            :v-model.trim="useAuthStore().password"
            :rules="[useConstStore().rules.required]"
        ></v-text-field>
        <v-text-field
            label="Confirm Password"
            class="test"
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            clearable
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :maxlength="30"
            :v-model.trim="useAuthStore().password"
            :rules="[useConstStore().rules.required]"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
            rounded="xl"
            class="flex-grow-1"
            variant="tonal"
            text="Зарегистрироваться"
        />
      </v-card-actions>

    </v-card>

  </v-form>
</template>

<script>
import {useConstStore} from "@/stores/const.js";
import {useAuthStore} from "@/components/auth/js/authStore.js";
import router from "@/router/index.js";

export default {
  name: "SignUpView",
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

    },
    route(value){
      router.push(value)
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.title-text
  padding-top: 30px
  padding-bottom: 20px
  text-align: center
  margin: 0 auto
  display: flex
</style>