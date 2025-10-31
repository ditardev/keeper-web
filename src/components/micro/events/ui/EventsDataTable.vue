<template>
  <v-data-table-virtual
      v-model="useEventsStore().selected"
      :item-value="item => `${item.id}`"
      :headers="headers"
      :items="useEventsStore().filteredEvents"
      item-key="item.name"
      :loading="loading"
      hover
      class="table transparent hover"
      density="comfortable"
      max-height="600"
      show-select
      @click:row="expand"
  >

    <template v-slot:top>

    </template>

    <template v-slot:item.name="{ item }">
      <div class="text-center">{{ item.name }}</div>
    </template>
    <template v-slot:item.date="{ item }">
      <div class="text-center">{{ item.date }}</div>
    </template>
    <template v-slot:item.time="{ item }">
      <div class="text-center">{{ item.startTime }}</div>
      <div class="text-center">{{ item.endTime }}</div>
    </template>
    <template v-slot:item.daysLeft="{ item }">
      <div class="text-center">{{ item.daysLeft }}</div>
    </template>
    <template v-slot:item.notify="{ item }">
      <v-switch
          :model-value="item.notify"
          style="display: flex; justify-content: center;"
          color="primary"
          hide-details
      />
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn class="actions-copy scalable-btn" variant="plain" density="comfortable" icon="$CopyIcon"
             @click="actionCopy(item.password)"/>
      <v-btn class="actions-description scalable-btn" variant="plain" density="comfortable" icon="$InfoIcon"
             @click="actionDescription(item)"/>
      <v-btn class="actions-update scalable-btn" variant="plain" density="comfortable" icon="$EditIcon"
             @click="actionUpdate(item)"/>
    </template>

    <template v-slot:no-data>
      <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Refresh"
          variant="text"
          border
          @click="refresh"
      ></v-btn>
    </template>

    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

  </v-data-table-virtual>
</template>

<script>
import {useEventsStore} from "@/components/micro/events/js/eventStore.js";
import utils from "@/stores/utils.js";

export default {
  name: "EventsDataTable",
  data() {
    return {
      expanded: [],

      loading: false,

      headers: [
        {title: 'Event', key: 'name', align: 'center', sortable: false},
        {title: 'Date', key: 'date', align: 'center', sortable: false},
        {title: 'Time', key: 'time', align: 'center', sortable: false},
        {title: 'Left', key: 'daysLeft', align: 'center', sortable: false},
        {title: 'Notify', key: 'notify', align: 'center', sortable: false},
        {title: 'Actions', key: 'actions', align: 'center', sortable: false},
      ],
    }
  },
  methods: {
    useEventsStore,
    refresh() {
      useEventsStore().getAll()
    },
    expand(item, event) {
      this.expanded.indexOf(event.item.suid) === -1 ? this.expanded.push(event.item.suid) : this.expanded.pop(event.item.suid);
    },
    actionCopy(item) {
      utils.copyToBuffer(item)
    },
    actionDescription(item) {
      console.log(item)
    },
    actionUpdate(item) {
      useEventsStore().event = item
      useEventsStore().dataFormVisibility = true
    },
  },
  mounted() {
    useEventsStore().getAll()
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.table
  padding: 10px

.column-name
  text-align: end

.column-date
  text-align: center

.column-time
  text-align: center

.column-left
  text-align: center

.column-notify
  text-align: center

.actions-copy:hover
  background-color: rgba(var(--v-theme-copy), 0.1)

.actions-description:hover
  background-color: rgba(var(--v-theme-descr), 0.1)

.actions-update:hover
  background-color: rgba(var(--v-theme-update), 0.1)
</style>