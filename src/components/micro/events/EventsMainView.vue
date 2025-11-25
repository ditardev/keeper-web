<template>
  <v-tabs
      v-model="tabs"
      align-tabs="center"
      bg-color="rgba(var(--v-theme-surface), 0.5)"
  >
    <v-tab
        v-for="(item, i) in pages"
        :value="item.value"
        :text="item.title"
        :color="item.color"
        :width="100/pages.length + '%'"
    >
    </v-tab>
  </v-tabs>

  <v-tabs-window v-model="tabs">
    <v-tabs-window-item :value="pages[0].value">
      <div class="sections-row">
        <v-container class="section events">
          <events-calendar/>
        </v-container>
      </div>
    </v-tabs-window-item>
    <v-tabs-window-item :value="pages[1].value">
      <div class="sections-row">
        <v-container class="section events">
          <events-action-bar/>
          <events-data-form/>
          <events-data-table/>
        </v-container>
      </div>
    </v-tabs-window-item>
    <exception-snackbar/>
  </v-tabs-window>


</template>

<script setup>
import {ref} from 'vue'
import router from "@/router/index.js";

const tabs = ref(null)

const pages = [
  {
    title: 'Calendar',
    value: "calendar",
    redirect: '/calendar/',
    disabled: false,
    icon: '$NavbarCalendarIcon',
    color: 'yellow'
  },
  {
    title: 'Table',
    value: "table",
    redirect: '/table/',
    disabled: false,
    icon: '$NavbarCalendarIcon',
    color: 'orange'
  },
]

function redirect(item) {
  this.selectedItem = item
  router.push(item.redirect);
}
</script>

<style scoped lang="sass">
@use '@/styles/main'
@use '@/styles/variables' as var
.nav-bar
  background-color: var.$transparent
  backdrop-filter: blur(20px)

.events
  width: 80%
  margin: 10px auto 0
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px
</style>
