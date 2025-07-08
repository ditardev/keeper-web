<template>
  <div class="sections-row">
    <v-btn
        icon="mdi-plus"
        @click="showAddForm"
    />
    <v-text-field clearable
                  label="Search"
                  variant="outlined"
                  density="compact"
                  append-inner-icon="mdi-magnify"
                  hide-details
                  :maxlength="10"
    />
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">

</style>