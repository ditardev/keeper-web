<template>
  <div class="sections-row">
    <v-container class="section panda">
        <panda-data-table/>
    </v-container>
  </div>
</template>

<script>
import PandaActionBar from "@/components/micro/panda/ui/PandaActionBar.vue";

export default {
  name: "PandaMainView",
  components: {PandaActionBar},
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.panda
  width: 80%
  margin: 10px auto 0
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px
</style>