<template>

  <v-list>
    <v-list-item
        rounded
        :title=appPage.home.title
        :value=appPage.home.value
        :prepend-icon="appPage.home.icon"
        :color="appPage.home.color"
        @click="redirect(appPage.home)"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list-item
        rounded
        v-for="(item, i) in microPages"
        :key="i"
        :value="item"
        :prepend-icon="item.icon"
        :color="item.color"
        :title="item.title"
        :disabled="item.disabled"
        @click="redirect(item)"
    >
    </v-list-item>

    <v-divider></v-divider>
    <v-list-item
        rounded
        :title=appPage.about.title
        :value=appPage.about.value
        :prepend-icon="appPage.about.icon"
        :color="appPage.about.color"
        @click="redirect(appPage.about)"
    ></v-list-item>

  </v-list>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: "NavigationBar",
  data() {
    return {
      selectedItem: {},
      appPage: {
        home: {title: 'Home', value: "home", redirect: '/home', icon: '$NavbarHomeIcon', color: 'green'},
        about: {title: 'About', value: "about", redirect: '/home', icon: '$NavbarAboutIcon', color: 'white'},
      },

      microPages: [
        {
          title: 'Panda',
          value: "panda",
          redirect: '/micro/panda',
          disabled: false,
          icon: '$NavbarPandaIcon',
          color: 'yellow'
        },
        {
          title: 'Events',
          value: "events",
          redirect: '/micro/events',
          disabled: false,
          icon: '$NavbarCalendarIcon',
          color: 'orange'
        },
        {
          title: 'ToDos',
          value: "todos",
          redirect: '/micro/todos',
          disabled: true,
          icon: '$NavbarTodosIcon',
          color: 'pink'
        },
        {
          title: 'Knowbase',
          value: "knowbase",
          redirect: '/micro/knowbase',
          disabled: true,
          icon: '$NavbarKnowbaseIcon',
          color: 'blue'
        },
        {
          title: 'Tests',
          value: "tests",
          redirect: '/home/test',
          disabled: false,
          icon: '$TestIcon',
          color: 'orange'
        },
      ]
    }
  },
  methods: {
    redirect(item) {
      this.selectedItem = item
      router.push(item.redirect);
    },
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

</style>
