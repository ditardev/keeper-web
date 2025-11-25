<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-avatar color="rgb(var(--v-theme-surface), 0.5)" v-bind="props">
        <strong>{{ getInitials }}</strong>
      </v-avatar>
    </template>
    <v-container class="container">
      <v-card
          class="user-menu-card"
          width="300"
          color="transparent">
        <v-card-title class="user-data">
          <v-row>
            <v-avatar size="40">
              <strong>{{ getInitials }}</strong>
            </v-avatar>
            <v-col>
              <v-row class="user-name-row">
                {{ getFullName }}
              </v-row>
              <v-row class="user-email-row">
                {{ getEmail }}
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-list color="red">
          <v-list-item
              rounded="md"
              v-for="(item, index) in menuItems"
              :key="index"
              :value="index"
              :title="item.title"
              :prepend-icon="item.icon"
              @click="route(item)">
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </v-menu>
</template>

<script>
import router from "@/router/index.js";
import {cleanUserData, getAuthUser} from "@/stores/user.js";

export default {
  name: "UserMenuAvatar",
  data() {
    return {
      menuItems: [
        {title: 'Profile', icon: '$AccountProfileIcon', route: "/profile"},
        {title: 'Settings', icon: '$AccountSettingsIcon', route: "/settings"},
        {title: 'Logout', icon: '$AccountLogoutIcon', route: "./"},
      ],
    }
  },
  methods: {
    route(item) {
      switch (item.title) {
        case "Logout": {
          cleanUserData()
        }
      }
      router.push(item.route)
    },
  },
  computed: {
    getInitials() {
      return getAuthUser().firstName[0] + getAuthUser().lastName[0]
    },
    getFullName() {
      return getAuthUser().firstName + " " + getAuthUser().lastName
    },
    getEmail() {
      return getAuthUser().email
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.v-avatar
  margin-right: 15px

.container
  backdrop-filter: blur(15px)
  border-radius: 20px

.v-card-title
  padding-top: 20px

.user-menu-card
  padding: 10px 10px 0 10px

.user-data
  height: 60px
  margin: 0 auto 5px 0

.user-name-row
  font-size: 15px

.user-email-row
  font-size: 13px

</style>
