<template>
  <v-container>
  <v-expand-transition v-show="usePandaStore().dataFormVisibility">
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field>text</v-text-field>
    </v-form>
  </v-expand-transition>
  </v-container>
</template>

<script>
import {usePandaStore} from "@/components/micro/panda/js/pandaStore.js";
export default {
  name: "PandaDataForm",
  data() {
    return {}
  },

  methods:{
    usePandaStore,
    submit(){

    }
  }
}
</script>

<style scoped lang="sass">

</style>