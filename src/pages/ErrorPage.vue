<template>
  <v-empty-state
      action-text="Login"
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      icon="$ErrorBrokenPage"
  >
    <template v-slot:actions>
      <v-btn
          text="LogIn"
          color="primary"
          variant="outlined"
          @click=onClickAction
      ></v-btn>
    </template>
  </v-empty-state>
</template>

<script>
import router from "@/router";

export default {
  name: "ErrorPage",
  components: {},
  methods: {
    onClickAction() {
      router.push('./')
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'
.v-empty-state
  padding: 10%
</style>
