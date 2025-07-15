<template>
  <div class="sections-row">
    <div class="section add-btn">
      <v-btn
        icon="mdi-plus"
        @click="showAddForm"
      />
    </div>
    <div class="section search-field">
      <v-text-field clearable
                    label="Search"
                    variant="outlined"
                    density="compact"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    :maxlength="10"
      />
    </div>
    <div class="section add-btn">
      <v-speed-dial
        location="bottom center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-fab
            v-bind="activatorProps"
            size="large"
            icon="$vuetify"
          ></v-fab>
        </template>

        <v-btn key="1" icon="$success"></v-btn>
        <v-btn key="2" icon="$info"></v-btn>
        <v-btn key="3" icon="$warning"></v-btn>
        <v-btn key="4" icon="$error"></v-btn>
      </v-speed-dial>
    </div>


  </div>
  <v-speed-dial
      location="bottom center"
      transition="fade-transition"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab
          v-bind="activatorProps"
          size="large"
          icon="$vuetify"
      ></v-fab>
    </template>

    <v-btn key="1" icon="$success"></v-btn>
    <v-btn key="2" icon="$info"></v-btn>
    <v-btn key="3" icon="$warning"></v-btn>
    <v-btn key="4" icon="$error"></v-btn>
  </v-speed-dial>
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
.v-speed-dial
  width: 70px

.add-btn
  margin-left: 15px
  margin-right: 15px
  width: 50px

.search-field
  width: 80%

</style>
