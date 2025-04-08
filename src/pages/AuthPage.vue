<template xmlns:v-btn="http://www.w3.org/1999/html">
  <v-btn
      text="StartHelloWorld"
      @click="signIN"

  ></v-btn>
</template>

<script>
import router from "@/router/index.js";

export default {
  methods: {
    signIN(){
      router.push("/home")
    }
  }
}
</script>

<style scoped>

</style>