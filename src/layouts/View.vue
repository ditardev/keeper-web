<template>
  <v-main>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-x" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </v-main>
</template>

<script>
</script>

<style scoped></style>