<template>
  <v-empty-state
    action-text="Login"
    headline="Whoops, 404"
    title="Page not found"
    text="The page you were looking for does not exist"
    image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script>
import router from "@/router";

export default {
  name: "ErrorPage",
  components: {},
  methods:{
    onClickAction(){
      router.push('./')
    }
  }
}
</script>

<style scoped>

</style>
