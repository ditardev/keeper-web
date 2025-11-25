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
                v-model.trim="useEventsStore().event.name"
                :rules="[
                  useConstStore().rules.required,
                ]"
            />
          </div>
        </div>
        <div class="sections-row">
          <div class="cell">
            <v-text-field
                v-mask="useConstStore().mask.date"
                hide-details
                label="Date"
                variant="outlined"
                density="compact"
                placeholder="YYYY-MM-DD"
                prepend-inner-icon="mdi-calendar-blank"
                v-model="useEventsStore().event.date"
                :rules="[useConstStore().rules.required, rules.range.date]"
            ></v-text-field>
          </div>
          <div class="cell">
            <v-text-field
                v-mask="useConstStore().mask.time"
                hide-details
                label="Time"
                variant="outlined"
                density="compact"
                placeholder="HH:MM"
                prepend-inner-icon="mdi-clock-outline"
                v-model="useEventsStore().event.time"
            ></v-text-field>
          </div>
          <div class="cell">
            <v-combobox
                label="Type"
                variant="outlined"
                density="compact"
                hide-details
                :maxlength="constants.typeLength"
                :items="useEventsStore().types"
                v-model.trim="useEventsStore().event.type"
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
                v-model="useEventsStore().event.notify"
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
                v-model.trim="useEventsStore().event.description"
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

      constants: {
        nameLength: 90,
        eventLength: 50,
        typeLength: 50,
        emailLength: 200,
      },

      rules: {
        range: {
          date: value => {
            if (!value || value.length !== 10) {
              return 'Wrong date';
            }

            const [yearStr, monthStr, dayStr] = value.split('-');
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);
            const daysInMonth = new Date(year, month, 0).getDate();

            return (
                year >= 1900 && year <= 5000 &&
                month >= 1 && month <= 12 &&
                day >= 1 && day <= daysInMonth
            );
          },
          time: value => {
            if (!value || typeof value !== 'string') {
              return 'Wrong time';
            }

            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
            const match = value.match(timePattern);

            if (!match) {
              return 'Wrong time';
            }

            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);

            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
              return true;
            }
            return 'Wrong time';
          }
        },
      },
    }
  },

  methods: {
    useEventsStore,
    useConstStore,

    async save() {
      await this.$refs.form.validate().then(validation => {
        if (validation.valid) {
          useEventsStore().save().then(response => {
            useEventsStore().getAll().then(response => {
              useEventsStore().resetEvent()
              useEventsStore().dataFormVisibility = false
            })
          })
        }
      })
    },

    init(event) {
      const [year, month, day] = event.date.split("-");
      this.event = {
        ...event,
        date: {day, month, year}
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
