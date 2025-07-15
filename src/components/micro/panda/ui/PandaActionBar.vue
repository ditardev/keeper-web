<template>
  <div class="sections-row">
    <div class="section add-btn">
      <v-btn
        icon="mdi-plus"
        @click="create"
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

    },
    create(){

    }
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
