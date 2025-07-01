<template>
  <v-container>
    <v-card class="scale">
      <v-card-title>Title</v-card-title>
      <v-card-subtitle>Subtitle</v-card-subtitle>
      <v-card-text>cardText</v-card-text>
      <v-card-actions>
        <v-btn class="btn"> test</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

</template>

<script>
export default {
  name: "ExpandableCard",
}
</script>

<style scoped lang="sass">

.v-card
  backdrop-filter: blur(2px)
  background-color: rgba(255, 255, 255, 0.2)

.v-container
  margin: 0 auto
  width: 50%

.scale
  transition: all .3s ease-in-out

.scale:hover
  transform: scale(1.2)

.btn:hover
  transform: scale(1.5)

</style>
