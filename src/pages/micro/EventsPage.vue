<template>
  <div>
    <events-main-view/>
  </div>
</template>

<script>
import EventsMainView from "@/components/micro/events/EventsMainView.vue";

export default {
  name: "EventsPage",
  components: {EventsMainView},
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'
</style>