<template>
  <div class="sections-row">
    <v-container class="section events">
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
  name: "EventsMainView",
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.events
  width: 80%
  margin: 10px auto 0
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px
</style>