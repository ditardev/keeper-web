<template>
  <v-tooltip
      activator="parent"
      @click="useExcStore().clear"
      location="bottom"
      :text=useExcStore().exMessage
  >
  </v-tooltip>
</template>

<script>
import {useExcStore} from "@/components/app/ex/js/exceptionStore.js";
export default {
  name: "ExceptionTooltip",
  data() {
    return {
      closeAfter: 50,
    }
  },
  methods:{
    useExcStore,
  }
}
</script>

<style lang="sass" scoped>

</style>