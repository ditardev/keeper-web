<template>
  <v-data-table-virtual
      v-model="selected"
      item-value="suid"
      :headers="headers"
      :items="accounts"
      :loading="loading"
      :hover="true"
      class="transparent"
      density="comfortable"
      height="740"
      show-select
      @click:row="expand"
  >

    <template v-slot:top>
      <panda-action-bar/>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn variant="plain" density="comfortable" icon="$CopyIcon"
             @click="actionCopy(item.password)"/>
      <v-btn variant="plain" density="comfortable" icon="$InfoIcon"
             @click="actionDescription(item)"/>
      <v-btn variant="plain" density="comfortable" icon="$EditIcon"
             @click="actionUpdate(item)"/>
    </template>

    <template v-slot:no-data>
      <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
      ></v-btn>
    </template>

  </v-data-table-virtual>
</template>

<script>
import {usePandaStore} from "@/components/micro/panda/js/pandaStore.js";

export default {
  name: "PandaDataTable",
  data() {
    return {

      selected: [],
      expanded: [],
      searchValue: "",

      loading: false,

      headers: [
        {title: 'Service', key: 'name', align: 'end', sortable: false},
        {title: 'Account', key: 'account', align: 'left', sortable: false},
        {title: 'Mail', key: 'email', align: 'left', sortable: false},
        {title: 'Actions', key: 'actions', align: 'center', sortable: false},
      ],

      accounts: [
        {suid: 1, name: "steam1", account: "Apostality1", email: "test_email1"},
        {suid: 2, name: "steam2", account: "Apostality2", email: "test_email2"},
        {suid: 3, name: "steam3", account: "Apostality3", email: "test_email3"},
      ],

      expand(item, event) {
        this.expanded.indexOf(event.item.suid) === -1 ? this.expanded.push(event.item.suid) : this.expanded.pop(event.item.suid);
      },
    }
  },
  methods: {
    usePandaStore,

    actionCopy(item) {
      console.log(item)
    },
    actionDescription(item) {
      console.log(item)
    },
    actionUpdate(item) {
      console.log(item)
    },
    reset() {

    }
  }
}
</script>
<style scoped lang="sass">
@use '@/styles/main'

.v-data-table-virtual
  margin: 15px

//.actions-copy
//  color: rgba(255, 192, 0, 0.6)
//
//.actions-description
//  color: rgba(0, 228, 255, 0.6)
//
//.actions-update
//  color: rgba(0, 255, 42, 0.6)
</style>