<template>
  <div>
    <panda-main-view/>
  </div>
</template>

<script>
import PandaMainView from "@/components/micro/panda/PandaMainView.vue";

export default {
  name: "PandaPage",
  components: {PandaMainView},
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'
</style>