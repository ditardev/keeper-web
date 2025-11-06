import {defineStore} from "pinia";
import eventsService from "@/components/micro/events/js/events.service.js";
import pandaService from "@/components/micro/panda/js/panda.service.js";

export const useEventsStore = defineStore('events', {
  state: () => ({
    selected: [],
    searchValue: '',

    types: ['ONCE', 'DAILY', 'MONTHLY', 'YEARLY', 'BIRTHDAY'],
    selectedType: 'All',

    dataFormVisibility: false,

    events: [],

    event: {
      id: -1,
      name: '',
      date: '',
      time: '',
      notify: false,
      type: '',
      description: '',
      daysLeft: ''
    }

  }),
  actions: {
    async getAll() {
      await eventsService.getAll().then(response => {
        if (response.status) {
          this.events = response.data
        }
      })
    },
    async filterTypes() {
    },

    async save() {
      return this.event.id === -1 ? this.saveEvent() : this.updateEvent()

    },
    async saveEvent() {
      return await eventsService.create(this.event).then(response => {
        return response.status
      })
    },
    async updateEvent() {
      return await eventsService.update(this.event).then(response => {
        return response.status
      })
    },
    async remove() {
      return await eventsService.delete(this.selected).then(response => {
        if (response) {
          this.getAll()
          this.selected = []
        }
      })
    },
    async import(importObj) {
    },
    async backup() {
    },
    template() {
    },
    resetEvent() {
    },
    convertAndValidateJson(json) {
    },
  },
  getters: {
    filteredEvents() {
      return [...this.searchUnits]
    },
    filterByName() {
      return [...this.events].sort((a, b) => a.name?.localeCompare(b.name));
    },
    searchByType() {
      return this.selectedType !== 'All' ? [...this.filterByName].filter(unit => unit.type?.includes(this.selectedType)) : [...this.filterByName];
    },
    searchUnits() {
      const searchValue = this.searchValue?.toLowerCase() || '';
      return [...this.searchByType].filter(unit => unit.name.toLowerCase().includes(searchValue) || unit.date.includes(searchValue));
    },
  },
})