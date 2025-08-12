<template>
  <div class="sections-row panda">
    <div class="add-btn">
      <v-btn
        icon="mdi-plus"
        @click="create"
      ></v-btn>
    </div>
    <div class="panda search-field ">
      <v-text-field clearable
                    label="Search"
                    variant="outlined"
                    density="compact"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    :maxlength="10"
                    v-model.trim="usePandaStore().searchValue"
      />
    </div>
    <div>
      <v-select
          class="panda"
          variant="outlined"
          density="compact"
          return-object
          single-line
          hide-details
          width="150px"
          :items="usePandaStore().types"
          v-model="usePandaStore().selectedType"
      />
    </div>
    <div class="add-btn">
      <file-action-menu :stote="usePandaStore"/>
    </div>
    <div>
      <v-btn
          icon="mdi-trash-can"
          min-width="50px"
          @click="remove"
      ></v-btn>
    </div>

  </div>

</template>

<script>
import {usePandaStore} from "@/components/micro/panda/js/pandaStore.js";
export default {
  name: "TitleBar",
  data() {
    return {}
  },
  methods:{
    usePandaStore,
    remove(){
        usePandaStore().remove()
    },
    create(){
      usePandaStore().dataFormVisibility = !usePandaStore().dataFormVisibility
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.panda
  margin-top: 5px

.add-btn
  margin-left: 15px
  margin-right: 15px
  width: 50px

.search-field
  width: 100%

</style>
