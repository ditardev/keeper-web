<template>
  <div class="sections-row">
    <!--  <web-sockests/>-->
    <!--    <DragAndDropExample></DragAndDropExample>-->
    <!--    <TransitionByHoverExample></TransitionByHoverExample>-->
    <!--    <expandable-card></expandable-card>-->
    <!--    <expandable-card></expandable-card>-->
    <!--    <expandable-card></expandable-card>-->
<!--    <flip-card/>-->
<!--    <MagicCard/>-->
<!--    <expandable-card/>-->
<!--    <gorgeous-card/>-->
<!--    <card-door/>-->
<!--    <expandable-lines-card/>-->
<!--    <glowable-card/>-->

  </div>
<!--  <div class="sections-row three-cards">-->
<!--    <three-cars/>-->
<!--  </div>-->
<!--  <div class="sections-row">-->
<!--    <photo-text-card/>-->
<!--  </div>-->
  <!--  <div class="sections-row stackable-cards">-->
  <!--    <stackable-card-expanded/>-->
  <!--  </div>-->
</template>

<script setup>

// import TransitionByHoverExample from "@/components/test/TransitionByHoverExample.vue";

import CardDoor from "@/components/test/CardDoor.vue";
import StackableCard from "@/components/test/StackableCard.vue";
</script>

<style scoped lang="sass">
@use '@/styles/main'
.sakura
  background: red
  z-index: 9999

.stackable-cards
  padding-left: 50%
  padding-top: 200px

.three-cards
  padding-top: 50px
  padding-bottom: 50px
  padding-left: 100px

.cell
  width: 100%
  padding-left: 2px
  padding-right: 2px
</style>
