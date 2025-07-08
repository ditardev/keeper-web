<template>
  <div class="sections-row">
    <v-container class="section panda">
      <v-card-title>
        <title-bar/>
      </v-card-title>
    </v-container>
  </div>
</template>

<script>
import TitleBar from "@/components/micro/panda/ui/TitleBar.vue";

export default {
  name: "PandaMainView",
  components: {TitleBar},
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