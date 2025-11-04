import {defineStore} from "pinia";
import eventsService from "@/components/micro/events/js/events.service.js";

export const useEventsStore = defineStore('events', {
  state: () => ({
    selected: [],
    searchValue: '',

    types: ['ONCE','DAILY','MONTHLY','YEARLY','BIRTHDAY'],
    selectedType: 'ALL',

    dataFormVisibility: false,

    events: [],

    event: {
      id: '',
      name: '',
      date:'',
      time: '',
      notify: false,
      type: '',
      description: '',
      daysLeft:''
    }
  }),
  actions: {
    async getAll() {
      await eventsService.getAll().then(response => {
        if(response.status){
          this.events = response.data
        }
      })
    },
    async filterTypes() {},

    async save(event) {
      return await eventsService.create(event).then(response => {
        if(response.status){
          this.events = response.data
        }
      })
    },
    async saveEvent() {},
    async updateEvent() {},
    async remove() {},
    async import(importObj){},
    async backup() {},
    template(){},
    resetEvent() {},
    convertAndValidateJson(json) {},
  },
  getters: {
    filteredEvents() { return [...this.events]},
    filterByName() {},
    searchByType() {},
    searchUnits() {},
  },
})