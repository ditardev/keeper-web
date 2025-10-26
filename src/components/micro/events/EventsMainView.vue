<template>
  <div>
    <v-sheet class="d-flex" tile>
      <v-btn
          class="ma-2"
          variant="text"
          icon
          @click="this.$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
          v-model="type"
          :items="types"
          class="ma-2"
          density="comfortable"
          label="type"
          variant="outlined"
          hide-details
      ></v-select>
      <v-btn
          class="ma-2"
          variant="text"
          icon @click="this.$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet class="section events" height="800">
      <v-calendar
          ref="calendar"
          v-model="value"
          locale="en"
          :event-color="getEventColor"
          :event-ripple="false"
          :events="events"
          color="primary"
          :type="type"
          :interval-format="intervalFormat"
          weekdays="1, 2, 3, 4, 5, 6, 0"
          @change="getEvents"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mouseleave="cancelDrag"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
      >
        <template v-slot:event="{ event, timed, eventSummary }">
          <v-tooltip
              :text="formatFullEventTime(event.start, event.end)"
              location="bottom"
              activator="parent"
          >
          </v-tooltip>
          <div class="v-event-draggable">
            <strong>{{ event.name }}</strong>
          </div>
          <div v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
          ></div>
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {VCalendar} from "vuetify/labs/components";

const type = ref('month')
const types = ['month', 'week', 'day']

const value = ref('')
const events = ref([])
const colors = [
  '#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575',
]
const names = [
  'Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party',
]
const dragEvent = ref(null)
const dragTime = ref(null)
const createEvent = ref(null)
const createStart = ref(null)
const extendOriginal = ref(null)

function startDrag(nativeEvent, {event, timed}) {
  if (event && timed) {
    dragEvent.value = event
    dragTime.value = null
    extendOriginal.value = null
  }
}

function startTime(nativeEvent, tms) {
  const mouse = toTime(tms)

  if (dragEvent.value && dragTime.value === null) {
    const start = dragEvent.value.start
    dragTime.value = mouse - start
  } else {
    createStart.value = roundTime(mouse)
    createEvent.value = {
      name: `Event #${events.value.length}`,
      color: rndElement(colors),
      start: createStart.value,
      end: createStart.value,
      timed: true,
    }
    events.value.push(createEvent.value)
  }
}

function extendBottom(event) {
  createEvent.value = event
  createStart.value = event.start
  extendOriginal.value = event.end
}

function mouseMove(nativeEvent, tms) {
  const mouse = toTime(tms)

  if (dragEvent.value && dragTime.value !== null) {
    const start = dragEvent.value.start
    const end = dragEvent.value.end
    const duration = end - start
    const newStartTime = mouse - dragTime.value
    const newStart = roundTime(newStartTime)
    const newEnd = newStart + duration

    dragEvent.value.start = newStart
    dragEvent.value.end = newEnd
  } else if (createEvent.value && createStart.value !== null) {
    const mouseRounded = roundTime(mouse, false)
    const min = Math.min(mouseRounded, createStart.value)
    const max = Math.max(mouseRounded, createStart.value)

    createEvent.value.start = min
    createEvent.value.end = max
  }
}

function endDrag() {
  dragTime.value = null
  dragEvent.value = null
  createEvent.value = null
  createStart.value = null
  extendOriginal.value = null
}

function cancelDrag() {
  if (createEvent.value) {
    if (extendOriginal.value) {
      createEvent.value.end = extendOriginal.value
    } else {
      const i = events.value.indexOf(createEvent.value)
      if (i !== -1) {
        events.value.splice(i, 1)
      }
    }
  }

  createEvent.value = null
  createStart.value = null
  dragTime.value = null
  dragEvent.value = null
}

function roundTime(time, down = true) {
  const roundTo = 15 // minutes
  const roundDownTime = roundTo * 60 * 1000

  return down
      ? time - time % roundDownTime
      : time + (roundDownTime - (time % roundDownTime))
}

function toTime(tms) {
  return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
}

function getEventColor(event) {
  const rgb = parseInt(event.color.substring(1), 16)
  const r = (rgb >> 16) & 0xFF
  const g = (rgb >> 8) & 0xFF
  const b = (rgb >> 0) & 0xFF

  return event === dragEvent.value
      ? `rgba(${r}, ${g}, ${b}, 0.7)`
      : event === createEvent.value
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event.color
}

function getEvents({start, end}) {
  const newEvents = []

  newEvents.push({
    name: "Hello",
    color: "grey",
    start: new Date().getTime(),
    end: new Date().getTime(),
    timed: false,
  })

  events.value = newEvents
}

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

function rndElement(arr) {
  return arr[rnd(0, arr.length - 1)]
}

function formatEventTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).toString()
}

function formatFullEventTime(startDate, endDate) {
  return formatEventTime(startDate) + "-" + formatEventTime(endDate)
}

function intervalFormat(interval) {
  return interval.time
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.events
  width: 80%
  margin: 10px auto 0
  @media (max-width: 800px)
    width: 100%
    margin: 10px 0 0 5px

.v-event-draggable
  padding-left: 6px


.v-event-timed
  user-select: none
  -webkit-user-select: none


.v-event-drag-bottom
  position: absolute
  left: 0
  right: 0
  bottom: 4px
  height: 4px
  cursor: ns-resize

  &::after
    display: none
    position: absolute
    left: 50%
    height: 4px
    border-top: 1px solid white
    border-bottom: 1px solid white
    width: 16px
    margin-left: -8px
    opacity: 0.8
    content: ''


  &:hover::after
    display: block

</style>
