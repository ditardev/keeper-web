<template>
  <div id="app">
    <vue-particles
        id="tsparticles"
        :options="fillConfig()"
    />
  </div>
</template>

<script setup>
//https://particles.js.org/
//https://particles.js.org/samples/presets/index.html
//https://particles.js.org/docs/documents/tsParticles_Engine.Options_Particles_Rotate.html

import {getCurrentTheme} from "@/styles/themes/config.js";
import {getActiveProfile} from "@/stores/app.js";

function fillConfig() {
  let config = getCurrentTheme()
  console.log(config)
  if(config.hasOwnProperty("image") && config.image.enabled){
    config = fillImages(config)
  }
  return config.particle
}

function fillImages(config){
  let profile = getActiveProfile()
  let currentURL = profile.baseUrl
  let imagesUrl = profile.imagesUrl
  let background = currentURL + imagesUrl + config.image.folder + '.svg'

  let particleImages = []
  for(let i = 1; i <= config.image.qty; i++){
    particleImages.push({
      src: currentURL + imagesUrl + config.image.folder + i + ".png"
    })
  }
  config.particle.background.image = "url('"+background+"')"
  config.particle.particles.shape.options.image = particleImages
  return config
}
</script>

<style lang="sass" scoped>

</style>
