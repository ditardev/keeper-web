<template>
  <v-container>
    <v-expand-transition v-show="useEventsStore().dataFormVisibility">
      <v-form ref="form" @submit.prevent="save">
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                clearable
                label="Name"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="constants.nameLength"
                v-model.trim="event.name"
                :rules="[
                  useConstStore().rules.required,
                ]"
            />
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                hide-details
                label="DD"
                variant="outlined"
                density="compact"
                :maxlength="2"
                v-model="event.date.day"
                :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
            ></v-text-field>
          </div>
          <div class="cell">
            <v-text-field
                hide-details
                label="MM"
                variant="outlined"
                density="compact"
                :maxlength="2"
                v-model="event.date.month"
                :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
            ></v-text-field>
          </div>
          <div class="cell">
            <v-text-field

                hide-details
                label="YYYY"
                variant="outlined"
                density="compact"
                :maxlength="4"
                v-model="event.date.year"
                :rules="[rules.required, rules.range.yearMin]"
            ></v-text-field>
          </div>
          <div class="cell">
            <v-combobox
                clearable
                label="Type"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="constants.typeLength"
                :items="useEventsStore().types"
                v-model.trim="event.type"
                :rules="[
                  useConstStore().rules.required,
                ]"
            />
          </div>
          <div class="cell">
            <v-switch
                style="display: flex; justify-content: center;"
                color="primary"
                density="compact"
                label="Shedule"
                hide-details
                v-model="event.notify"
            ></v-switch>
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                clearable
                label="Description"
                variant="outlined"
                density="compact"
                hide-details
                v-model.trim="event.description"
            />
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-btn
                class="glowing-warning"
                color="rgba(var(--v-theme-warning), 0.1)"
                variant="elevated"
                width="100%"
                @click="close"
                text="Close"
            />
          </div>
          <div class="cell">
            <v-btn
                class="glowing-surface"
                color="rgba(var(--v-theme-surface), 0.1)"
                variant="elevated"
                width="100%"
                @click="clear"
                text="Clear"
            />
          </div>
          <div class="cell">
            <v-btn
                class="glowing-primary"
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
import {useEventsStore} from "@/components/micro/events/js/eventStore.js";
import {useConstStore} from "@/stores/const.js";

export default {
  name: "EventsDataForm",
  data() {
    return {

      event: {
        id: '',
        name: '',
        date: {
          day:'',
          month:'',
          year:''
        },
        time: '',
        notify: false,
        type: '',
        description: '',
        daysLeft:''
      },

      constants: {
        nameLength: 90,
        eventLength: 50,
        typeLength: 50,
        emailLength: 200,
      },

      rules: {
        range: {
          dayMin: value => value > 0 || 'Sure?',
          dayMax: value => value < 32 || 'Sure?',

          monthMin: value => value > 0 || 'Sure?',
          monthMax: value => value <= 12 || 'Sure?',

          yearMin: value => value >= 1900 || 'Too Early',
        },
      },
    }},

  methods: {
    useEventsStore,
    useConstStore,

    async save() {
      await this.$refs.form.validate().then(validation => {
        if (validation.valid) {
          let event = {...this.event}
          event.date = this.getDate()
          useEventsStore().save(event).then(response => {
            useEventsStore().getAll().then(response => {
              useEventsStore().resetEvent()
              useEventsStore().dataFormVisibility = false
            })
          })
        }
      })
    },

    init(event){
      const [year, month, day] = event.date.split("-");
      this.event = {
        ...event,
        date: { day, month, year }
      };
    },

    async clear() {
      useEventsStore().resetEvent()
      this.$refs.form.reset()
    },

    async close() {
      useEventsStore().resetEvent()
      useEventsStore().dataFormVisibility = false
      this.$refs.form.reset()
    },

    async format(date) {
      return this.adapter.toISO(date)
    },
    getDate(){
      let date = new Date(`${this.event.date.year}-${this.event.date.month}-${this.event.date.day}`)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`
    }
  },

}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.cell
  width: 100%
  padding-left: 2px
  padding-right: 2px
</style>
