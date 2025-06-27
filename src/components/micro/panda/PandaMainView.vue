<template>
  <div class="sections-row">
    <v-container class="section panda">
      <v-card>
        <v-card-title>
          title
        </v-card-title>
        <v-card-subtitle>
          subtitle
        </v-card-subtitle>
        <v-card-text>
          text
        </v-card-text>
        <v-card-actions>
          actions
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PandaMainView",
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