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
                :maxlength="this.pandaConstants.nameLength"
                v-model.trim="usePandaStore().account.name"
                :rules="[
                  useConstStore().rules.required,
                ]"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Account"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="this.pandaConstants.accountLength"
                v-model.trim="usePandaStore().account.account"
                :rules="[
                  useConstStore().rules.required,
                ]"
            />
          </div>
          <div class="cell">
            <v-text-field
                clearable
                label="Mail"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="this.pandaConstants.emailLength"
                v-model.trim="usePandaStore().account.email"
                :rules="[
                  useConstStore().rules.required,
                  useConstStore().rules.email,
                ]"
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
            <v-combobox
                clearable
                label="Type"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="this.pandaConstants.typeLength"
                :items="usePandaStore().types"
                v-model.trim="usePandaStore().account.type"
                :rules="[
                  useConstStore().rules.required,
                ]"
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
                :maxlength="useConstStore().const.passwordMaxLength"
                @click:append-inner="generatePassword"
                v-model.trim="usePandaStore().account.password"
                :rules="[
                  useConstStore().rules.required,
                  useConstStore().rules.passwordMin,
                ]"
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
import {useConstStore} from "@/stores/const.js";
export default {
  name: "PandaDataForm",
  data() {
    return {
      pandaConstants:{
        nameLength: 90,
        accountLength: 50,
        typeLength: 50,
        emailLength: 200,
      },
    }
  },

  methods: {
    usePandaStore,
    useConstStore,
    generatePassword() {
      usePandaStore().generatePassword()
    },
    async save() {
      await this.$refs.form.validate().then(validation =>{
        if(validation.valid){
          usePandaStore().save().then(response => {
            usePandaStore().getAll().then(response => {
              usePandaStore().resetAccount()
              usePandaStore().dataFormVisibility = false
            })
          })
        }
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