<template>
  <v-snackbar
      v-model="useExcStore().isException"
      vertical
      color="transparent"
      @click="useExcStore().isException = false"
  >
    <v-alert
        color="orange"
        variant="outlined"
        type="warning"
        prominent
    >
      <template v-slot:title>
        <p class="snackbar-title">
          Warning
          {{ useExcStore().exCode }}
          {{ useExcStore().exStatus }}
        </p>
      </template>

      <template v-slot:text>
        <p class="snackbar-text">
          {{ useExcStore().exMessage }}
        </p>
      </template>

    </v-alert>

  </v-snackbar>
</template>

<script>
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";

export default {
  name: "ExceptionSnackbar",
  data() {
    return {}
  },
  methods: {
    useExcStore
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.v-snackbar
  background-color: rgba(0, 0, 0, 0)

.snackbar-title
  font-size: 24px
  color: orange

.snackbar-text
  padding-top: 10px
</style>