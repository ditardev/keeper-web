<template>
  <v-app-bar color="rgba(var(--v-theme-surface), 0.5)" height="50">
    <v-app-bar-nav-icon icon="$MenuIcon"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-img width="45" src="@/assets/images/svg/appbar-fox.svg"/>
    </v-app-bar-title>

      <v-app-bar-nav-icon size="50">
        <toggle-theme-btn></toggle-theme-btn>
      </v-app-bar-nav-icon>

      <v-app-bar-nav-icon size="50">
        <user-menu-avatar></user-menu-avatar>
      </v-app-bar-nav-icon>

  </v-app-bar>

  <navigation-bar/>
</template>

<script>
import ToggleThemeBtn from "@/components/app/ui/ToggleThemeBtn.vue";
import NavigationBar from "@/components/app/NavigationBar.vue";
import UserMenuAvatar from "@/components/app/ui/UserMenuAvatar.vue";

export default {
  name: "ApplicationBar",
  components: {UserMenuAvatar, NavigationBar, ToggleThemeBtn},
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.v-app-bar
  margin: 0 auto

</style>