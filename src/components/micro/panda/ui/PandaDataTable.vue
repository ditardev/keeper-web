<template>

  <v-data-table-virtual
      v-model="usePandaStore().selected"
      :item-value="item => `${item.id}`"
      :headers="headers"
      :items="usePandaStore().filteredAccounts"
      item-key="item.name"
      :loading="loading"
      hover
      class="table transparent hover"
      density="comfortable"
      height="300"
      max-height="740"
      show-select
      @click:row="expand"
  >

    <template v-slot:top>

    </template>

    <template v-slot:item.account="{ item }">
      <div class="scalable-cell" @click="actionCopy(item.account)">{{ item.account }}</div>
    </template>

    <template v-slot:item.email="{ item }">
      <td class="scalable-cell" @click="actionCopy(item.email)">{{ item.email }}</td>
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
import {usePandaStore} from "@/components/micro/panda/js/pandaStore.js";
import utils from "@/stores/utils.js";

export default {
  name: "PandaDataTable",
  data() {
    return {

      expanded: [],

      loading: false,

      headers: [
        {title: 'Service', key: 'name', align: 'end', sortable: false},
        {title: 'Account', key: 'account', align: 'left', sortable: false},
        {title: 'Mail', key: 'email', align: 'left', sortable: false},
        {title: 'Actions', key: 'actions', align: 'center', sortable: false},
      ],
    }
  },
  methods: {
    usePandaStore,

    refresh() {
      usePandaStore().getAll()
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
      usePandaStore().account = item
      usePandaStore().dataFormVisibility = true
    },
  },
  mounted() {
    usePandaStore().getAll()
  }
}
</script>
<style scoped lang="sass">
@use '@/styles/main'

.table
  padding: 10px

.actions-copy:hover
  background-color: rgba(var(--v-theme-copy), 0.1)

.actions-description:hover
  background-color: rgba(var(--v-theme-descr), 0.1)

.actions-update:hover
  background-color: rgba(var(--v-theme-update), 0.1)
</style>