<template>
  <div>
    <div class="sections-row">
      <v-container class="section balance-calc">
        <balance-calculator></balance-calculator>
      </v-container>
      <v-container class="section choise-ball">
        <choise-ball></choise-ball>
      </v-container>
    </div>
    <div class="sections-row">
      <v-container class="section balance-calc">
        <weather-indicator></weather-indicator>
      </v-container>
      <v-container class="section choise-ball">
        <choise-ball></choise-ball>
      </v-container>
    </div>
  </div>
</template>

<script setup>

import BalanceCalculator from "@/components/home/BalanceCalculator.vue";
import ChoiseBall from "@/components/home/ChoiseBall.vue";
import WeatherIndicator from "@/components/home/WeatherIndicator.vue";
</script>

<style lang="sass" scoped>
@use '@/styles/main'

.balance-calc
  width: 50%
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px

.choise-ball
  width: 50%
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px

</style>