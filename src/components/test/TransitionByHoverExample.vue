<template>
  <div>
    <v-container>
      <v-row v-for="(item) in this.items">
        <v-hover v-slot="{ isHovering, props }" close-delay="300">
          <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 16 : 2"
              width="100%"
              v-bind="props"
          >
            <v-card-title>{{ item.title }}</v-card-title>
            <v-expand-transition>
              <div
                  v-if="isHovering || item.isOpened"
                  class="d-flex bg-orange-darken-2 v-card--reveal text-h2"
                  style="height: 100%"
              >
                <v-card-text @click="item.isOpened=!item.isOpened">{{ item.text }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-row>
    </v-container>

    <v-container>
      <v-row v-for="(item) in this.items">
        <v-hover v-slot="{ isHovering, props }" close-delay="300">
          <v-card
              class="mx-auto"
              width="100%"
              v-bind="props"
          >
            <v-card-title @click="item.isOpened=!item.isOpened">{{ item.title }}</v-card-title>
            <v-expand-transition>
              <div
                  v-if="isHovering || item.isOpened"
              >
                <v-card-text>{{ item.text }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "TransitionByHoverExample",
  data: () => ({
    items: [
      {
        title: "title1",
        text: "text1",
        isOpened: false,
      },
      {
        title: "title2",
        text: "text2",
        isOpened: false,
      },
      {
        title: "title3",
        text: "text3",
        isOpened: false,
      },
      {
        title: "title4",
        text: "text4",
        isOpened: false,
      },
    ]
  })
}
</script>

<style lang="sass" scoped>

.v-container
  width: 50%

.v-card-title:hover
  background-color: rgba(var(--v-theme-secondary), 0.7)

.v-card--reveal
  align-items: center
  bottom: 0
  justify-content: center
  opacity: 0.9
  position: absolute
  width: 100%
</style>
