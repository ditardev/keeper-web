<template>
  <v-fade-transition>
    <v-alert
        v-model="useExcStore().isException"
        variant="tonal"
        density="compact"
        prominent
        @click="useExcStore().clear"
    >
      <template v-slot:text>
        <p class="snackbar font-weight-bold">
          {{ useExcStore().exTitle }}
        </p>
        <p class="snackbar">
          {{ useExcStore().exMessage }}
        </p>
      </template>

    </v-alert>
  </v-fade-transition>
</template>

<script>
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";

export default {
  name: "ExceptionSnackbar",
  data() {
    return {}
  },
  methods: {
    useExcStore,
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.v-alert
  border-radius: 5px
  background-color: rgba(var(--v-theme-error), 0.0)

.snackbar
  color: orange
  text-align: center

</style>