<template>
  <v-container>
    <div class="eyes">
      <div class="eye">
        <div class="pupil"></div>
      </div>
      <div class="eye">
        <div class="pupil"></div>
      </div>
    </div>
  </v-container>

</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  // Теперь DOM-элементы гарантированно существуют, и pupils будет заполнен.
  const pupils = document.querySelectorAll(".eye .pupil");

  window.addEventListener("mousemove", (e) => {
    // Внутри onMounted console.log(pupils) покажет NodeList с двумя элементами

    pupils.forEach((pupil) => {
      // get x and y postion of cursor
      let rect = pupil.getBoundingClientRect();

      // Используйте clientX/clientY, так как screenX/screenY могут давать
      // неожиданные результаты при прокрутке и для отслеживания движения курсора относительно окна
      let x = (e.clientX - rect.left) / 40 + "px";
      let y = (e.clientY - rect.top) / 40 + "px";

      pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
    });
  });
});
</script>

<style scoped lang="sass">
body
  background-color: #000

.eyes
  width: 100%
  height: 200px
  display: flex
  justify-content: center
  align-items: center
  flex-direction: row
  column-gap: 20px


.eye
  width: 85px
  height: 70px
  border-radius: 100%
  background-color: #fff
  display: flex
  justify-content: center
  align-items: center


.pupil
  width: 40px
  height: 40px
  border-radius: 101px
  background-color: #000

</style>