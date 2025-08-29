<template>
  <v-app>
    <application-bar></application-bar>
    <View/>
  </v-app>
</template>

<script>
import View from "@/layouts/View.vue";
import ApplicationBar from "@/components/app/ApplicationBar.vue";

export default {
  name: "Main",
  components: {ApplicationBar, View},
}
</script>

<style scoped>

</style>