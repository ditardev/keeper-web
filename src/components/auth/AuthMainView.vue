<template>
  <v-container class="section section-center">
  <div class="sections-row">
    <v-container class="logo">
      <logo-view></logo-view>
    </v-container>
    <v-container>
      <router-view v-slot="{ Component, route }">
        <transition name="scroll-y-transition" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </v-container>
  </div>
  </v-container>
  <v-btn @click="signIN">
    route
  </v-btn>
</template>
<script>
import router from "@/router/index.js";
import LogoView from "@/components/auth/ui/LogoView.vue";
import SignInView from "@/components/auth/ui/SignInView.vue";

export default {
  name: "AuthMainView",
  components: {SignInView, LogoView},
  data() {
    return {}
  },
  methods: {
    signIN() {
      router.push("/home")
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.logo
  border-radius: 25px
  border-width: 1px
  border-color: white
  @media (max-width: 1000px)
    visibility: collapse
    width: 0
    height: 0

.section-center
  margin: 9% auto
  background: rgba(var(--v-theme-surface), 0.0)
  width: 80%
  border-color: red
  border-width: 1px
  @media (max-width: 1000px)
    margin: 1% auto
    padding: 5px
  @media (max-width: 500px)
    width: 100%
    margin: 0 auto
    padding: 0


</style>
