<template>

    <v-alert
        v-model="useExcStore().isException"
        variant="tonal"
        density="compact"
        prominent
        @click="useExcStore().clear"
    >
<!--      <template v-slot:title>-->
<!--        <p class="snackbar-title">-->
<!--          Warning-->
<!--          {{ useExcStore().exCode }}-->
<!--          {{ useExcStore().exStatus }}-->
<!--        </p>-->
<!--      </template>-->

      <template v-slot:text>
        <p class="snackbar-title font-weight-bold">
          {{ useExcStore().exStatus }}
        </p>
        <p class="snackbar-text">
          {{ useExcStore().exMessage }}
        </p>
      </template>

    </v-alert>

<!--  </v-snackbar>-->
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

.v-alert
  border-radius: 5px
  background-color: rgba(var(--v-theme-error), 0.0)

.snackbar-title
  color: orange
  fon
  text-align: center

.snackbar-text
  color: orange
  text-align: center
</style>