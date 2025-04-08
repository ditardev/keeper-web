<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      :options="selectParticle()"
    />
  </div>
</template>

<script setup>
//https://particles.js.org/
//https://particles.js.org/samples/presets/index.html
//https://particles.js.org/docs/documents/tsParticles_Engine.Options_Particles_Rotate.html
import Default from "@/styles/particles/Default.json"
import Primary from "@/styles/particles/Primary.json"
import Christmas from "@/styles/particles/Christmas.json"

const intervals = [
  {
    particle: Christmas,
    start: {month: "12", day: "01"},
    end: {month: "02", day: "01"},
  },
  {
    particle: Primary,
    start: {month: "01", day: "03"},
    end: {month: "01", day: "02"},
  },
]

function selectParticle() {
  return determineParticleByCurrentDay()
}

function determineParticleByCurrentDay() {
  let currentDate = new Date(); //YYYY-MM-DD
  let particle = Default
  intervals.forEach(interval => {
    let convertedInterval = convertIntervalToDates(interval)
    if (currentDate > convertedInterval.startDate && currentDate < convertedInterval.endDate) {
      particle = interval.particle
    }
  })
  return particle
}

function convertIntervalToDates(interval) {
  let isNewYear = interval.start.month > interval.end.month
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  let startDate = currentYear
  let endDate = currentYear
  if (isNewYear) {
    let currentMonth = currentDate.getMonth()
    currentMonth > interval.end.month ? endDate = (currentYear + 1) : startDate = (currentYear - 1)
  }
  startDate += "-" + interval.start.month + "-" + interval.start.day
  endDate += "-" + interval.end.month + "-" + interval.end.day
  return {
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  }
}
</script>

<style lang="sass" scoped>

</style>
