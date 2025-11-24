<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      :options="getCurrentParticle()"
    />
  </div>
</template>

<script setup>
//https://particles.js.org/
//https://particles.js.org/samples/presets/index.html
//https://particles.js.org/docs/documents/tsParticles_Engine.Options_Particles_Rotate.html

import {getCurrentParticle} from "@/styles/themes/config.js";

</script>

<style lang="sass" scoped>

</style>
