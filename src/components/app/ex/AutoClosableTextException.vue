<template>
  <v-label
      disabled
      :text="useExcStore().exMessage"
  ></v-label>
</template>

<script>
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";

export default {
  name: "AutoClosableTextException",
  data() {
    return {}
  },
  methods: {
    useExcStore,

  }
}
</script>

<style lang="sass" scoped>
.v-label
  height: 50px
  margin: 0 auto
  text-wrap: inherit
  color: rgba(var(--v-theme-warning), 1)
  max-width: 500px
</style>