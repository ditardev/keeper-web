<template>
  <v-container>
    <v-expand-transition v-show="usePandaStore().dataFormVisibility">
      <v-form ref="form" @submit.prevent="save">
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                clearable
                label="Name"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.name"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Account"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.account"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Mail"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.email"
            />
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                clearable
                label="Link"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.link"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Type"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.type"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Password"
                variant="outlined"
                density="compact"
                hide-details
                :append-inner-icon="'mdi-refresh'"
                @click:append-inner="generatePassword"
                v-model.trim="usePandaStore().account.password"
            />
          </div>
        </div>
        <div class="cell">
          <div class="sections-row">
            <v-text-field
                clearable
                label="Description"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="usePandaStore().account.description"
            />
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-btn
                color="rgba(var(--v-theme-warning), 0.1)"
                variant="elevated"
                width="100%"
                @click="close"
                text="Close"
            />
          </div>
          <div class="cell">
            <v-btn
                color="rgba(var(--v-theme-surface), 0.1)"
                variant="elevated"
                width="100%"
                @click="clear"
                text="Clear"
            />
          </div>
          <div class="cell">
            <v-btn
                color="rgba(var(--v-theme-primary), 0.1)"
                variant="elevated"
                width="125%"
                @click="save"
                text="Save"
            />
          </div>
        </div>
      </v-form>
    </v-expand-transition>
  </v-container>
</template>

<script>
import {usePandaStore} from "@/components/micro/panda/js/pandaStore.js";

export default {
  name: "PandaDataForm",
  data() {
    return {}
  },

  methods: {
    usePandaStore,
    generatePassword() {

    },
    save() {
      usePandaStore().save().then(response =>{
        usePandaStore().getAll().then(response =>{
            usePandaStore().resetAccount()
            usePandaStore().dataFormVisibility = false
        })
      })
    },
    clear() {
      usePandaStore().resetAccount()
    },
    close() {
      usePandaStore().resetAccount()
      usePandaStore().dataFormVisibility = false
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.cell
  width: 100%
  padding-left: 2px
  padding-right: 2px

</style>