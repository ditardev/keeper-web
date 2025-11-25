<template>
  <div class="sections-row events">
    <div class="add-btn">
      <v-btn
          class="scalable-btn"
          icon="mdi-plus"
          @click="create"
      ></v-btn>
    </div>
    <div class="events search-field">
      <v-text-field clearable
                    label="Search"
                    variant="outlined"
                    density="compact"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    :maxlength="10"
                    v-model.trim="useEventsStore().searchValue"
      />
    </div>
    <div>
      <v-select
          class="events"
          variant="outlined"
          density="compact"
          return-object
          single-line
          hide-details
          width="150px"
          :items="types"
          v-model="useEventsStore().selectedType"
      />
    </div>
    <div class="add-btn scalable-btn">
      <file-action-menu :store="useEventsStore()"/>
    </div>
    <div>
      <v-btn
          class="scalable-btn"
          icon="mdi-trash-can"
          min-width="50px"
          @click="remove"
      ></v-btn>
    </div>
  </div>
</template>

<script>
import {useEventsStore} from "@/components/micro/events/js/eventStore.js";

export default {
  name: "EventsActionBar",
  data() {
    return {}
  },
  methods: {
    useEventsStore,
    remove() {
      useEventsStore().remove()
    },
    create() {
      useEventsStore().dataFormVisibility = !useEventsStore().dataFormVisibility
    }
  },
  computed: {
    types() {
      let types = ['All']
      return types.concat(useEventsStore().types)
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.events
  margin-top: 5px

.add-btn
  margin-left: 15px
  margin-right: 15px
  width: 50px

.search-field
  width: 100%
</style>