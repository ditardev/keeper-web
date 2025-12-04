<template>
  <v-container class="eyebody eye-container">
    <div class="eyes">
      <div class="eye">
        <div class="iris">
          <div class="pupil">
            <div class="highlight"></div>
          </div>
        </div>
      </div>
      <div class="eye">
        <div class="iris">
          <div class="pupil">
            <div class="highlight"></div>
          </div>
        </div>
      </div>
    </div>
  </v-container>

</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  // Нам нужно следить за элементом .iris, так как он содержит pupil и highlight
  const irises = document.querySelectorAll(".iris");

  // Определяет максимальное смещение от центра (радиус движения)
  // В данном случае, это половина разницы между радиусом глаза (60px)
  // и радиусом радужки (30px), т.е. 30px
  const movementRange = 15;

  window.addEventListener("mousemove", (e) => {
    irises.forEach((iris) => {
      // Получаем родительский элемент (.eye) для расчета центра
      const eye = iris.parentElement;
      let rect = eye.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

      const x = Math.cos(angle) * movementRange;
      const y = Math.sin(angle) * movementRange;

      iris.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });
});
</script>

<style scoped lang="sass">

.eyes
  display: flex
  justify-content: center
  align-items: center
  column-gap: 20px // Увеличим расстояние между глазами

.eye
  width: 90px
  height: 40px
  border-radius: 50%
  background-color: #f7f7f7
  border: 3px solid #333
  position: relative
  overflow: hidden
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset

.iris
  width: 20px // Средний размер
  height: 20px
  border-radius: 50%
  background: radial-gradient(circle at center, #2e7d32 0%, #1b5e20 80%)
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)


.pupil

  width: 15px
  height: 15px
  border-radius: 50%
  background-color: #000
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.highlight
  width: 8px
  height: 8px
  border-radius: 50%
  background-color: rgba(255, 255, 255, 0.7)
  position: absolute
  top: 10px
  right: 10px
  filter: blur(0.5px)

</style>
